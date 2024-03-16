import { Sortable, Swap, SortableOptions } from 'sortablejs/modular/sortable.core.esm';
// import { reactive } from 'vue';

Sortable.mount(new Swap());

// Cache Region: Used to temporarily store dragged data
// Must be reset to null when ending the drag
const CacheRegion = reactive({
  data: null
});

export const initDraggingContainer = (container: Element, options, lifecycle: SortableOptions = {}) => {
  if (!container) {
    throw new Error('[InitSortable/containerError]: Can not get element container.');
  }
  const { onEnd, onAdd, onMove, onClone, onStart } = lifecycle;
  container.addEventListener('dragstart', (ev) => {
    ev.stopPropagation();
  });

  return new Sortable(container, {
    dragClass: 'custom-draging',
    ghostClass: 'custom-ghost',
    chosenClass: 'custom-chosen',
    ...options,
    
    // Triggered when clone an element.
    onClone(evt) {
      onClone && typeof onClone === 'function' && onClone(evt, CacheRegion);
    },
    // 开始拖拽的时候
    onStart(/** Event */evt) {
      onStart && typeof onStart === 'function' && onStart(evt, CacheRegion);
    },
    // Drag while moving.
    onMove(evt) {
      onMove && typeof onMove === 'function' && onMove(evt, CacheRegion);
    },

    // Drag and drop elements from one list to another.
    onAdd(evt) {
      onAdd && typeof onAdd === 'function' && onAdd(evt, CacheRegion);
    },

    // End the drag.
    onEnd(evt) {
      onEnd && typeof onEnd === 'function' && onEnd(evt, CacheRegion);
      CacheRegion.data = null;
    }
  });
};


export default Sortable;
