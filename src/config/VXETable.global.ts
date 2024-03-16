import VXETable from 'vxe-table';
import i18n from '@utils/i18n';
import lodash from 'lodash';


VXETable.config({
  // size: null, // Global size

  // version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  i18n: (key, args) => i18n.t(key, args),
  table: {
    showHeader: true,
    minHeight: 60,
    //   keepSource: false,
    //   showOverflow: null,
    //   showHeaderOverflow: null,
    //   showFooterOverflow: null,
    //   size: null,
    //   autoResize: false,
    //   stripe: false,
    border: true,
    //   round: false,
    emptyText: i18n.t('No Data'),
    rowConfig: {
      useKey: true,
      keyField: lodash.uniqueId('lx-grid-') // 行数据的唯一主键字段名
    },
    columnConfig: {
      useKey: true,
      isCurrent: false,
      resizable: true
    },
    //   radioConfig: {
    //     trigger: 'default'
    //   },
    //   checkboxConfig: {
    //     strict: false,
    //     highlight: false,
    //     range: false,
    //     trigger: 'default'
    //   },
    //   sortConfig: {
    //     remote: false,
    //     trigger: 'default',
    //     orders: ['asc', 'desc', null],
    //     sortMethod: null
    //   },
    //   filterConfig: {
    //     remote: false,
    //     filterMethod: null
    //   },
    //   expandConfig: {
    //     trigger: 'default',
    //     showIcon: true
    //   },
    //   treeConfig: {
    //     rowField: 'id',
    //     parentField: 'parentId',
    //     children: 'children',
    //     hasChild: 'hasChild',
    //     mapChildren: '_X_ROW_CHILD',
    //     indent: 20,
    //     showIcon: true
    //   },
    //   tooltipConfig: {
    //     enterable: true
    //   },
    //   menuConfig: {
    //     visibleMethod () {}
    //   },
    editConfig: {
      trigger: 'dblclick',
      enabled: true,
      mode: 'cell',
      showAsterisk: true
    },
    //   importConfig: {
    //     modes: ['insert', 'covering']
    //   },
    //   exportConfig: {
    //     modes: ['current', 'selected']
    //   },
    //   customConfig: {
    //    storage: false
    //   },
    //   scrollX: {
    //     gt: 60
    //   },
    scrollY: {
      enabled: true,
      gt: 20
    }
  },
  // grid: {
  //   size: null,
  //   zoomConfig: {
  //     escRestore: true
  //   },
  //   pagerConfig: {
  //     perfect: false
  //   },
  //   toolbarConfig: {
  //     perfect: false
  //   },
  //   proxyConfig: {
  //     autoLoad: true,
  //     message: true,
  //     props: {
  //       list: null, // 用于列表，读取响应数据
  //       result: 'result', // 用于分页，读取响应数据
  //       total: 'page.total' // 用于分页，读取总条数
  //     }
  //     beforeItem: null,
  //     beforeColumn: null,
  //     beforeQuery: null,
  //     afterQuery: null,
  //     beforeDelete: null,
  //     afterDelete: null,
  //     beforeSave: null,
  //     afterSave: null
  //   }
  // },
  // pager: {
  //   size: null,
  //   autoHidden: false,
  //   perfect: true,
  //   pageSize: 10,
  //   pagerCount: 7,
  //   pageSizes: [10, 15, 20, 50, 100],
  //   layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  // },
  // form: {
  //   preventSubmit: false
  //   size: null,
  //   colon: false,
  //   validConfig: {
  //     autoPos: true
  //   },
  //   tooltipConfig: {
  //     enterable: true
  //   },
  //   titleAsterisk: true
  // },
  // input: {
  //   size: null,
  //   transfer: false
  //   parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
  //   labelFormat: '',
  //   valueFormat: '',
  //   startDay: 1,
  //   digits: 2,
  //   controls: true
  // },
  // textarea: {
  //   size: null
  //   autosize: {
  //     minRows: 1,
  //     maxRows: 10
  //   }
  // },
  select: {
    // size: null,
    transfer: true
    // optionConfig: {
    //   keyField: '_X_OPTION_KEY' // 选项数据的唯一主键字段名
    // },
    // multiCharOverflow: 8
  }
  // toolbar: {
  //   size: null,
  //   import: {
  //     mode: 'covering'
  //   },
  //   export: {
  //     types: ['csv', 'html', 'xml', 'txt']
  //   },
  //   custom: {
  //     isFooter: true
  //   },
  //   buttons: [],
  //   tools: []
  // },
  // button: {
  //   size: null,
  //   transfer: false
  // },
  // radio: {
  //   size: null
  // },
  // checkbox: {
  //   size: null
  // },
  // switch: {
  //   size: null
  // },
  // modal: {
  //   // size: null,
  //   minWidth: 340,
  //   minHeight: 60
  //   lockView: true,
  //   mask: true,
  //   duration: 3000,
  //   marginSize: 0,
  //   dblclickZoom: true,
  //   showTitleOverflow: true
  //   storage: false
  // },
  // list: {
  //   scrollY: {
  //     gt: 100
  //   }
  // }
});
