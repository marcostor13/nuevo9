import {  Action, createReducer, on } from '@ngrx/store';
import * as states from '../actions/setdata.actions';
import * as globalState from '../state/state';
import { cloneDeep } from 'lodash-es';
import { Ielement, Landing } from '../../modules/admin/landings/models/add-landing';

const reducer = createReducer(
    globalState.initialState,
    on(
        states.setdata, 
        (state: globalState.IStoreState, action: { data: any }): globalState.IStoreState => {            
            return {
                ...state,
                data: state.data
            }
        }
    ),
    on(
        states.setLoading,
        (state: globalState.IStoreState, action: { isLoading: string }): globalState.IStoreState => {            
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
    ),
    on(
        states.setCreatingDataLanging,
        (state: globalState.IStoreState, action: { dataLanding: Landing }): globalState.IStoreState => {            
            return {
                ...state,
                landing: action.dataLanding
            }
        }
    ), 
    on(
        states.addElementDataLanding,
        (state: globalState.IStoreState, action: { element: Ielement }): globalState.IStoreState => {
            const data:Landing = cloneDeep(state.landing)
            data.elements.push(action.element);
            return {
                ...state,
                landing: data
            }
        }
    ), 
    on(
        states.editElementDataLanding,
        (state: globalState.IStoreState, action: { element: Ielement, index:number }): globalState.IStoreState => {
            const data: Landing = cloneDeep(state.landing)
            data.elements[action.index] = action.element;
            return {
                ...state,
                landing: data
            }
        }
    ),   
    
    on(
        states.setListLandings,
        (state: globalState.IStoreState, action: { landings: Landing[] }): globalState.IStoreState => {            
            return {
                ...state,
                landings: action.landings
            }
        }
    ),

    on(
        states.editLanding,
        (state: globalState.IStoreState, action: { landing: Landing }): globalState.IStoreState => {
            const newlanding = { ...action.landing, elementSelected: null, elementSelectedIndex: null}
            return {
                ...state,
                landing: newlanding,                
            }
        }
    ),

    
)

export function Reducer(state: globalState.IStoreState = globalState.initialState, action: Action) {
    return reducer(state, action);
}
