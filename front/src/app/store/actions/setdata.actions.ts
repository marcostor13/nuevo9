import { createAction, props } from '@ngrx/store'
import { Ielement, Landing } from 'src/app/modules/admin/landings/models/add-landing'

// GLOBAL
export const setdata = createAction('setdata', props<{ data: any }>())
export const setLoading = createAction('setloading', props<{ isLoading: string }>())

// LANDINGS
export const setCreatingDataLanging = createAction('setCreatingDataLanging', props<{ dataLanding: Landing }>())
export const addElementDataLanding = createAction('addElementDataLanding', props<{ element: Ielement }>())
export const editElementDataLanding = createAction('editElementDataLanding', props<{ element: Ielement, index:number }>())
export const setListLandings = createAction('setListLandings', props<{ landings: Landing[] }>())
export const editLanding = createAction('editLanding', props<{ landing: Landing }>())


export const stateActions = {
    setdata,
    setLoading,
    setCreatingDataLanging,
    addElementDataLanding,
    editElementDataLanding,
    setListLandings,
    editLanding,
}