import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import {analytics} from "../../firestore"

const initialState = {
    mainColor: "rgba(21,174,8,100)",
    openedSideMenu:false,
    categories:[],
    loadingCategories:false,
    language:"en",

    //show info window
    showInfoWindow:true,
    
    //contents
    error:null,
    contents: [],
    loadingContents:false,
    contentsCached: {},
    lastScores: {},

    //authors
    loadingAuthors:false,
    authorsCached: null,
    featuredAuthors:null,

    //user
    userConnected: true,
    userId: null,

    //share modal
    openedShareModal:false,
    pathToShare:null,
    authorContentToShare:null,
    titleContentToShare:null,
    imageContentToShare:null,

    //comment modal
    openedCommentModal:false,
    
}


// Side Menu
const openSideMenu = (state, action) => {
    return updateObject( state, {openedSideMenu:true})
}

const closeSideMenu = (state, action) => {
    return updateObject( state, {openedSideMenu:false})
}

//React to content 👏
const clapContent  = (state,action) => {
    return state
    }

//language
const changeLanguage = (state,action) => {
    return updateObject( state, {language: action.language })
    }

// info window  
const closeInfoWindow = (state, action) => {
    console.log("🇪🇹🇪🇷🇪🇹🇪🇷 close info window")
    return updateObject( state, {showInfoWindow:false})
}

//share modal
const openShareModal = (state, action) => {
    
    return updateObject( state, {openedShareModal:true,
                                 pathToShare:action.pathShare,
                                 authorContentToShare: action.author,
                                 titleContentToShare:action.title,
                                 imageContentToShare:action.image})
}

const closeShareModal = (state, action) => {
    return updateObject( state, {openedShareModal:false})
}

//comment modal
const openCommentModal = (state, action) => {
    analytics.logEvent('comment_click')
    return updateObject( state, {openedCommentModal:true})
}

const closeCommentModal = (state, action) => {
    return updateObject( state, {openedCommentModal:false})
}



// Get Categories
const startLoadingCategories= (state, action) => {
    return updateObject( state, {loadingCategories:true})
}

const loadCategoriesSuccess= (state, action) => {
    if(action.contentsCached){
    return updateObject( state, {
        loadingCategories:false,
        categories: action.categories,
        contentsCached:action.contentsCached
    });
    }else{
        return updateObject( state, {
            loadingCategories:false,
            categories: action.categories,
        });
    }
}

const loadCategoriesFail= (state, action) => {
    return updateObject( state, {loadingCategories:false})
}


// get Authors
const startLoadingAuthors= (state, action) => {
    return updateObject( state, {loadingAuthors:true})
}

const loadAuthorsSuccess = (state, action) => {
    console.log("action=",action)
    return updateObject( state, {
        loadingAuthors:false,
        authorsCached:action.authorsCached,
        authorsFeatured: action.authorsFeatured
    });
}

const loadAuthorsFail= (state, action) => {
    return updateObject( state, {loadingAuthors:false})
}


// Get Content
const startLoadingContents= (state, action) => {
    return updateObject( state, {loadingContents:true})
}

const loadContentsSuccess= (state, action) => {
    let contentsCachedNew = state.contentsCached
    if (action.resfresh){
        contentsCachedNew={}
    }
    if (action.categoryId){
        contentsCachedNew[action.categoryId] = contentsCachedNew[action.categoryId].concat(action.contents)
    }

    return updateObject( state, {
        loadingContents:false,
        contents: action.contents,
        contentsCached:contentsCachedNew,
        lastScores: action.lastScores
    });
}

const loadContentsFail= (state, action) => {
    return updateObject( state, {loadingContents:false})
}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        // Side Menu
        case actionTypes.OPEN_SIDE_MENU: return openSideMenu( state, action );
        case actionTypes.CLOSE_SIDE_MENU: return closeSideMenu( state, action );

        // React to content
        case actionTypes.CLAP_CONTENT: return clapContent(state, action );
        
        // Share Modal
        case actionTypes.OPEN_SHARE_MODAL: return openShareModal( state, action );
        case actionTypes.CLOSE_SHARE_MODAL: return closeShareModal( state, action );

        // Info window
        case actionTypes.CLOSE_INFO_WINDOW: return closeInfoWindow( state, action );

        //change language
        case actionTypes.CHANGE_LANGUAGE: return changeLanguage( state, action ); 

        // Comment Modal
        case actionTypes.OPEN_COMMENT_MODAL: return openCommentModal( state, action );
        case actionTypes.CLOSE_COMMENT_MODAL: return closeCommentModal( state, action );
        
        // Categories
        case actionTypes.START_LOADING_CATEGORIES: return startLoadingCategories( state, action );
        case actionTypes.LOAD_CATEGORIES_SUCCESS: return loadCategoriesSuccess( state, action );
        case actionTypes.LOADING_CATEGORIES_FAIL: return loadCategoriesFail( state, action );

        // Authors
        case actionTypes.START_LOADING_AUTHORS: return startLoadingAuthors( state, action );
        case actionTypes.LOAD_AUTHORS_SUCCESS: return loadAuthorsSuccess( state, action );
        case actionTypes.LOADING_AUTHORS_FAIL: return loadAuthorsFail( state, action );

        // Contents
        case actionTypes.START_LOADING_CONTENTS: return startLoadingContents( state, action );
        case actionTypes.LOAD_CONTENTS_SUCCESS: return loadContentsSuccess( state, action );
        case actionTypes.LOADING_CONTENTS_FAIL: return loadContentsFail( state, action );



        default: return state;
    }
};

export default reducer;