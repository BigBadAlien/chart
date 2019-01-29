import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { loggerMiddleware } from '../middleware/loggerMiddleware';


export function configureStore(initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
    );

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware);
    }

    return createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;
}
