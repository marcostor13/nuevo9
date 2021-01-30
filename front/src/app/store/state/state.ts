
import { Landing } from './../../modules/admin/landings/models/add-landing';

export interface IStoreState {
    data: any
    isLoading: string
    landing: Landing
    landings: Landing[]
}

export const initialState: IStoreState = {
    data: {}, 
    isLoading: '0',
    landing: null,
    landings: null
};
