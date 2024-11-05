var menu = [
    {
        title: 'Home',
        href: thematicViewerApp.geoportalHostURL + '/index.html',
        icon: 'fas fa-home',
        id: 'home',
    },
    {
        title: 'Priority Data Sets Viewer',
        href: thematicViewerApp.geoportalHostURL + '/pdv_home.html',
        icon: 'fas fa-list-ol',
        id: 'priorityDataSet',
        submenu: [
            {
                title: 'Overview',
                href: thematicViewerApp.geoportalHostURL + '/pdv_home.html',
                isSubMenu: true,
                 icon: 'fas fa-list-ol',
            },
            {
                title: 'Country overview',
                href: thematicViewerApp.geoportalHostURL + '/overview.html?view=pdEuOverview&legislation=all',
                isSubMenu: true,
                icon: 'fas fa-map-marked-alt'
            },
            {
                title: 'Environmental Domains',
                href: thematicViewerApp.geoportalHostURL + '/envDomain_selection.html?view=qsEnvDomain',
                isSubMenu: true,
                icon: 'fas fa-seedling'
            },
            {
                title: 'E-Reporting Legislation',
                href: thematicViewerApp.geoportalHostURL + '/legislation_selection.html?view=qsLegislation',
                isSubMenu: true,
                icon: 'fas fa-gavel'
            }
        ]
    },
    {
        title: 'Thematic Viewer',
        href: thematicViewerApp.geoportalHostURL + '/tv_home.html',
        icon: 'fas fa-th-list',
        id: 'thematicViewer',
        submenu: [
            {
                title: 'Overview',
                href: thematicViewerApp.geoportalHostURL + '/tv_home.html',
                isSubMenu: true,
                icon: 'fas fa-th-list'
            },
            {
                title: 'Country overview',
                href: thematicViewerApp.geoportalHostURL + '/overview.html?view=thematicEuOverview&theme=none',
                isSubMenu: true,
                icon: 'fas fa-map-marked-alt'
            },
            {
                title: 'INSPIRE Data Themes',
                href: thematicViewerApp.geoportalHostURL + '/theme_selection.html?view=qsTheme',
                isSubMenu: true,
                icon: 'fas fa-list'
            }
        ]
    },
//    EE: comment FT 
//    {
//        title: 'Feature Type Viewer <sup class="badge badge-info py-1">beta</sup>',
//        href: thematicViewerApp.geoportalHostURL + '/ft_home.html',
//        icon: 'fas fa-project-diagram',
//        id: 'featureTypeViewer',
//        submenu: [
//            {
//                title: 'Overview',
//                href: thematicViewerApp.geoportalHostURL + '/ft_home.html',
//                isSubMenu: true,
//                icon: 'fas fa-project-diagram'
//            },
////            {
////                title: 'Country overview',
////                href: thematicViewerApp.geoportalHostURL + '/overview.html?view=pdEuOverview&legislation=all',
////                isSubMenu: true,
////                icon: 'fas fa-map-marked-alt'
////            },
//            {
//                title: 'CATALOGUE OF INSPIRE Feature types',
//                href: thematicViewerApp.geoportalHostURL + '/ft_catalogue.html',
//                isSubMenu: true,
//                 icon: 'fas fa-book'
//            },
//            {
//                title: 'INTERACTIVE WORKFLOW',
//                href: thematicViewerApp.geoportalHostURL + '/ft_workflow.html',
//                isSubMenu: true,
//                icon: 'fas fa-magic'
//            }
//        ]
//    },
    {
        title: 'Harvesting status',
        href: thematicViewerApp.geoportalHostURL + '/harvesting_status.html',
        icon: 'fas fa-h-square',
        sandboxHidden: true,
        id: 'harvest',
    },
    {
        title: 'Find out more about',
        href: '#',
        icon: 'fas fa-book',
        multilevel: true,
        rightalign: true,
        id: 'findOutMore',
        submenu: [
            {
                title: 'Priority Data Sets',
                href: '#',
                multilevelentry: true,
                submenu: [
                    {
                        title: 'MIWP Action 2016.5 Wiki',
                        href: 'https://webgate.ec.europa.eu/fpfis/wikis/x/W4LdEQ',
                        blank: true,
                        isSubMenu: true
                    },
                    {
                        title: 'Guidance for tagging data sets',
                        href: 'https://ies-svn.jrc.ec.europa.eu/projects/2016-5/wiki/Implementation',
                        blank: true,
                        isSubMenu: true
                    },
                    {
                        title: 'Code list in INSPIRE Registry',
                        href: 'https://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/',
                        blank: true,
                        isSubMenu: true
                    }
                ]
            },
            {
                title: 'INSPIRE Themes',
                href: '#',
                multilevelentry: true,
                submenu: [
                    {
                        title: 'INSPIRE KB: Data Themes',
                        href: 'https://inspire.ec.europa.eu/Themes/Data%20Specifications/2892',
                        blank: true,
                        isSubMenu: true
                    },
                    {
                        title: 'INSPIRE KB: INSPIRE in your country',
                        href: 'https://inspire.ec.europa.eu/INSPIRE-in-your-Country',
                        blank: true,
                        isSubMenu: true
                    }
                ]
            },
            {
                title: 'Metadata tools',
                href: '#',
                multilevelentry: true,
                submenu: [
                    {
                        title: 'Resource browser',
                        href: thematicViewerApp.geoportalHostURL + '/proxybrowser',
                        blank: true,
                        isSubMenu: true
                    },
                    {
                        title: 'Resources Linkage Checker',
                        href: thematicViewerApp.geoportalHostURL + '/linkagechecker.html',
                        isSubMenu: true,
                        sandboxHidden: true
                    }
                ]
            }
        ]
    }
];

function menuItem(item) {
    let tmp = '';
    if (item) {
        if (!thematicViewerApp.sandbox.active || (thematicViewerApp.sandbox.active && !item.sandboxHidden)) {
            let rightalign = (item.rightalign) ? '' : '';
            if (item.multilevelentry && item.submenu) {
                tmp += '<li class="dropdown" id="'+item.id+'">';
            } else {
                tmp += '<li class="' + ((item.multilevelentry || item.isSubMenu) ? 'dropdown-item' : 'nav-item') + ((item.submenu) ? ' dropdown' : '') + ((rightalign) ? rightalign : '') + '">';
            }
            tmp += '<a class="' + ((item.multilevelentry) ? 'dropdown-item' : 'nav-link') + '"' + ((item.blank) ? ' target="_blank"' : '') + ' href="' + item.href + '"' + ((item.submenu && !item.multilevelentry) ? ' role="button" aria-haspopup="true" aria-expanded="false"' : '') + '>';
            tmp += '<i ' + ((item.icon) ? ' class="' + item.icon + '"' : '') + '></i> ' + item.title + '' + ((item.submenu && !item.multilevelentry) ? ' ' : '') + ((item.blank) ? ' <i class="small fas fa-external-link-alt"></i>' : '');
            tmp += '</a>';
            if (item.submenu) {
                tmp += '<ul class="dropdown-menu">';
                $.each(item.submenu, function (i, v) {
                    tmp += menuItem(v);
                });
                tmp += '</ul>';
            }
            tmp += '</li>';
        }
    }
    return tmp;
}
function createMenu() {

    let tmpa = '';
    $.each(menu, function (index, value) {
        tmpa += menuItem(value);
    });
    $('#main-menu').smartmenus({
        showTimeout: 0,
        hideTimeout: 0,
        mainMenuSubOffsetY: -10,
        subMenusMaxWidth: '30em'
    });
    let menuObject = $('#main-menu');
    menuObject.append(tmpa);
    menuObject.smartmenus('refresh');
}
$(function () {
    createMenu();
});