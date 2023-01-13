export type ApplicationState = {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
}

export type ApplicationActions = 
  | { type: 'SELECT_CATEGORY', payload: string }
  | { type: 'SELECT_LOCATION', payload: string }
  | { type: 'SELECT_TAG', payload: string }

export const selectCategory = (category: string) => ({
  type: 'SELECT_CATEGORY',
  payload: category
});

export const selectLocation = (location: string) => ({
  type: 'SELECT_LOCATION',
  payload: location
});

export const selectTag = (tag: string) => ({
  type: 'SELECT_TAG',
  payload: tag
});