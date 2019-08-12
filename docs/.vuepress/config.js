module.exports = {
  host:'0.0.0.0',
  port: "49999",
  dest: "docsdist",
  base: "/",
  markdown: {
    externalLinks: {
      target: '_blank', rel: 'noopener noreferrer'
    }
  },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "兼容ie8 ssr框架",
      description: "为简化开发而生"
    }
  },
  head: [["link", { rel: "icon", href: `/favicon.ico` }]],
  themeConfig: {
    editLinks: false,
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "指南",
            link: "/guide/"
          },
          // {
          //   text: "配置",
          //   link: "/config/"
          // },
        ],
        sidebar: {
          "/guide/": genGuideSidebar(),
          // "/config/": genConfigSidebar()
        }
      }
    }
  }
};

function genGuideSidebar() {
  return [
    {
      title: "快速入门",
      collapsable: false,
      children: ["", "框架浅析",'API','如何开发组件','如何开发业务','发布流程','写在最后']
    },
    // {
    //   title: "核心功能",
    //   collapsable: false,
    //   children: ["generator", "crud-interface", "wrapper", "page", "sequence"]
    // },
    // {
    //   title: "插件扩展",
    //   collapsable: false,
    //   children: [
    //     "hot-loading",
    //     "logic-delete",
    //     "enum",
    //     "auto-fill-metainfo",
    //     "sql-injector",
    //     "block-attack-sql-parser",
    //     "performance-analysis-plugin",
    //     "p6spy",
    //     "optimistic-locker-plugin",
    //     "dynamic-datasource",
    //     "tenant",
    //     "mybatisx-idea-plugin"
    //   ]
    // },
    
  ]
}

// function genConfigSidebar() {
//   return [
//     {
//       title: "配置",
//       collapsable: false,
//       children: ["", "generator-config"]
//     }
//   ]
// }