import { createStore } from 'redux';
import { reducer } from './reducer';

export interface RootState {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
}


export const store = createStore(reducer);