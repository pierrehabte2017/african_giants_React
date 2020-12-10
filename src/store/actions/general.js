import * as actionTypes from "./actionTypes"
import {db} from "../../firestore"
import firebase from "firebase";


//Side menu
export const openSideMenu = () =>{
    return {type: actionTypes.OPEN_SIDE_MENU}
}

export const closeSideMenu = () =>{
    return {type: actionTypes.CLOSE_SIDE_MENU}
}

//language
export const changeLanguage = (lang) =>{
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language:lang
    }
}


// React to content
export const clapContent = (contentId, categoryId, numberLikes) =>{
    return {type: actionTypes.CLAP_CONTENT,
            contentId: contentId,
            categoryId:categoryId,
            numberLikes:  numberLikes}
}

//Share Modal
export const openShareModal = (pathShare, author, title, image) =>{
    return {type: actionTypes.OPEN_SHARE_MODAL,
        pathShare: pathShare,
        author: author,
        title: title,
        image: image}
}

export const closeShareModal = () =>{
    return {type: actionTypes.CLOSE_SHARE_MODAL}
}

//Info window
export const closeInfoWindow = () =>{
    return {type: actionTypes.CLOSE_INFO_WINDOW}
}


//Comment Modal
export const openCommentModal = () => {
    return {type: actionTypes.OPEN_COMMENT_MODAL}
}

export const closeCommentModal = () =>{
    return {type: actionTypes.CLOSE_COMMENT_MODAL}
}
    

//Categories
export const startLoadingCategories = () => {
  
    return {type: actionTypes.START_LOADING_CATEGORIES}
}

export const loadCategoriesSuccess = (categories, initializeContentsCached) => {
    //initialize the list of contents cached
    if (initializeContentsCached){
        let contentsCached = {}
        for (const cat of categories){
            contentsCached = {
                ...contentsCached,
                [cat.categoryId]:[]
            }
    }
    return {type: actionTypes.LOAD_CATEGORIES_SUCCESS,
        categories:categories,
        contentsCached:contentsCached}

    }else{
        //case we have already loaded the categories onces
        return {type: actionTypes.LOAD_CATEGORIES_SUCCESS,
            categories:categories}
    }
}

export const loadCategoriesFail = (error) => {

    return {
        type: actionTypes.LOADING_CATEGORIES_FAIL,
        error:error
    }
}

export const getCategories = (categories) => {
     
    return dispatch =>{
        //case1: we have already loaded the categories
        if (categories.length>0){
            dispatch(loadCategoriesSuccess(categories, false))
            
        }
        //case2: we have already loaded the categories
        else {
            dispatch(startLoadingCategories);

            // with firestore
            db.collection("categories")
                .get()
                .then(querySnapshot => {
                const listCategories  = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        categoryId: doc.id  
                    }
                }).sort((a, b) => (a.rank > b.rank) ? 1 : -1);
                dispatch(loadCategoriesSuccess(listCategories, true));
                })
                .catch(err => {
                    dispatch(loadCategoriesFail(err))
                });


            }

    }
}
    
//authors
export const startLoadingAuthors = () => {
    return {type: actionTypes.START_LOADING_AUTHORS}
}

export const loadAuthorsSuccess  = (authorsCached, authorsFeatured) => {
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS,
        authorsCached: authorsCached,
        authorsFeatured: authorsFeatured}
}


export const loadAuthorsFail = (error) => {
    return {
        type: actionTypes.LOADING_AUTHORS_FAIL,
        error: error
    }
}

export const getAuthors = (authorsCached, authorsFeatured) => {

    return dispatch => {
        const batchSize = 50

        // we already loaded the authors before
        if (authorsCached){
            dispatch(loadAuthorsSuccess(authorsCached, authorsFeatured));

        // first time we load authors
        } else {
            let authorsCachedNew = {}
        

            // get the featured creators
            db.collection("discover")
              .where("type", "==", "FEATURED")
              .get()
              .then(querySnapshot => {
                    const authorsFeaturedIds = querySnapshot.docs.map(doc => {
                        return {
                            ...doc.data() 
                        }
                    })
                    console.log("FEATURED=", authorsFeaturedIds)
                    return authorsFeaturedIds[0]['authors']
                }).then(ids =>{
   
                    db.collection("authors")
                        .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
                        .get()
                        .then(querySnapshot => {
                            const authorsFeaturedNew = querySnapshot.docs.map(doc => {
                                return {
                                    ...doc.data() ,
                                    authorId:doc.id
                                }
                            })

                            console.log("Featured Authors=", authorsFeatured)

                            //get author 
                            db.collection("authors")
                            .orderBy("numberLikes", "desc")
                            .limit(batchSize)
                            .get()
                            .then(querySnapshot => {
                                
                                const authors = querySnapshot.docs.map(doc => {
                                    return {
                                        ...doc.data(),
                                        authorId: doc.id  
                                    }
                                })

                                console.log("authors list=",authors)

                                for (const element of authors) {
                                    const catId = element['categoryId']
                                    if (Object.keys(authorsCachedNew).includes(catId)){
                                        let newList = authorsCachedNew[element['categoryId']].concat(element)
                    
                                        authorsCachedNew = {
                                            ...authorsCachedNew,
                                            [element['categoryId']]: newList
                                        }
                                    } else{
                                        authorsCachedNew[element['categoryId']] = [element]
                                    }
                                
                                }
                                
                                dispatch(loadAuthorsSuccess(authorsCachedNew, authorsFeaturedNew));
                    
                
                            })
                        })

                    

                })

            

        }

    }

}





//Contents
export const startLoadingContents = () => {
    return {type: actionTypes.START_LOADING_CONTENTS}
}

export const loadContentsSuccess  = (contents, categoryId,lastScores, refresh) => {
    return {type: actionTypes.LOAD_CONTENTS_SUCCESS,
        contents:contents,
        categoryId: categoryId,
        lastScores:lastScores,
        refresh: refresh}
}

export const loadContentsFail = (error) => {
    return {
        type: actionTypes.LOADING_CONTENTS_FAIL,
        error:error
    }
}

export const getContents = (categoryId, nameCategory, contentsCached, lastScores, refresh = false) => {
    
    //function to get content goes here
    
    //batch of content in one page
    const batchSize = 5;
   

    return dispatch => {

        
        dispatch(startLoadingContents());
       
        // or get all docs matching the query

        //if it's a refresh we need to start over
        if (refresh){
            lastScores={}
            contentsCached = {}
        }
        

        if (nameCategory !== "all"){
            dispatch(closeInfoWindow());
            //select the score of the latest element in feed
            let lastScore = 1000000000
            if (Object.keys(lastScores).includes(categoryId) ){
                lastScore = lastScores[categoryId]
            } 

            db.collection("contents")
            .where("categoryId", "==", categoryId)
            .where("score", ">", 0.0001)
            .orderBy("score", "desc")
            .startAfter(lastScore)
            .limit(batchSize)
            .get()
            .then(querySnapshot => {
                const contents = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        contentId: doc.id  
                    }
                })
                
    

                // update lastScores:
                let lastScoresNew = {
                    ...lastScores,
                    [categoryId]: contents[contents.length-1]["score"]
                }
                dispatch(loadContentsSuccess(contents, categoryId, lastScoresNew, refresh));
                
                
            }).catch(err => {
                dispatch(loadContentsFail(err))
            });

        } else {

            //select the score of the latest element in feed
            let lastScore = 1000000000
            if (Object.keys(lastScores).includes(categoryId) ){
                lastScore = lastScores[categoryId]
            } 
        
            db.collection("contents")
            .where("score", ">", 0.0001)
            .orderBy("score", "desc")
            .startAfter(lastScore)
            .limit(batchSize)
            .get()
            .then(querySnapshot => {
                const contents = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        contentId: doc.id  
                    }
                })
                //update lastScores:
                let lastScoresNew = {
                    ...lastScores,
                    [categoryId]: contents[contents.length-1]["score"]
                }

                dispatch(loadContentsSuccess(contents, categoryId, lastScoresNew));
            }).catch(err => {
                dispatch(loadContentsFail(err))
            });

        }


    }
}
    