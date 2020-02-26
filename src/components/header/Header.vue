<template>
    <div>
        <!-- begin #header -->
        <div class="header navbar-default" id="header">
            <!-- begin navbar-header -->
            <div class="navbar-header">
                <button class="navbar-toggle pull-left" type="button" v-if="pageOptions.pageWithTwoSidebar"
                        v-on:click="toggleMobileRightSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" to="/dashboard/v2"><span class="navbar-logo"></span> <b
                    style="margin-right: 4px">冻友后台管理 </b>
                </router-link>
                <button class="navbar-toggle pt-0 pb-0 mr-0 collapsed" type="button"
                        v-if="pageOptions.pageWithTopMenu && !pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileTopMenu">
					<span class="fa-stack fa-lg text-inverse">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
                </button>
                <button class="navbar-toggle" type="button"
                        v-if="pageOptions.pageWithTopMenu && pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileTopMenu">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <button class="navbar-toggle p-0 m-r-0" type="button" v-if="pageOptions.pageWithMegaMenu"
                        v-on:click="toggleMobileMegaMenu">
					<span class="fa-stack fa-lg text-inverse m-t-2">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
                </button>
                <button class="navbar-toggle" type="button" v-if="!pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <!-- end navbar-header -->

            <header-mega-menu v-if="pageOptions.pageWithMegaMenu"></header-mega-menu>

            <!-- begin header-nav -->
            <ul class="navbar-nav navbar-right">

                <b-nav-item-dropdown menu-class="navbar-language" no-caret v-if="pageOptions.pageWithLanguageBar">
                    <template slot="button-content">
                        <span class="flag-icon flag-icon-us mr-1" title="us"></span>
                        <span class="name d-none d-sm-inline mr-1">EN</span> <b class="caret"></b>
                    </template>
                    <b-dropdown-item href="javascript:;"><span class="flag-icon flag-icon-us" title="us"></span> English
                    </b-dropdown-item>
                    <b-dropdown-item href="javascript:;"><span class="flag-icon flag-icon-cn" title="cn"></span> Chinese
                    </b-dropdown-item>
                    <b-dropdown-item href="javascript:;"><span class="flag-icon flag-icon-jp" title="jp"></span>
                        Japanese
                    </b-dropdown-item>
                    <b-dropdown-item href="javascript:;"><span class="flag-icon flag-icon-be" title="be"></span> Belgium
                    </b-dropdown-item>
                    <b-dropdown-divider class="m-b-0"></b-dropdown-divider>
                    <b-dropdown-item class="text-center" href="javascript:;">more options</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown class="dropdown navbar-user" menu-class="dropdown-menu-right" no-caret v-else>
                    <template slot="button-content" v-if="!usernameStatus">
                        <span class="d-none d-md-inline" @click="logOut">登录</span>
                    </template>
                    <template slot="button-content" v-else>
                        <span class="d-md-inline">Admin</span>
                    </template>
                    <b-dropdown-item @click="logOut">退出登录</b-dropdown-item>
                </b-nav-item-dropdown>
                <li class="divider d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar"></li>
                <li class="d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar">
                    <a class="f-s-14" href="javascript:;" v-on:click="toggleRightSidebarCollapsed">
                        <i class="fa fa-th"></i>
                    </a>
                </li>
            </ul>
            <!-- end header navigation right -->
        </div>
        <!-- end #header -->
    </div>
</template>

<script>
    import PageOptions from '../../config/PageOptions.vue';
    import HeaderMegaMenu from './HeaderMegaMenu.vue';

    export default {
        name: 'Header',
        components: {
            HeaderMegaMenu
        },
        computed: {
            usernameStatus() {
                if (this.cookies.get('token')) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        data() {
            return {
                pageOptions: PageOptions,
                isAdmin: false
            };
        },
        methods: {
            logOut() {
                localStorage.clear();
                this.cookies.remove('token');
                this.$router.push({path: '/'});
                // 这里应该 clear token
            },
            toggleMobileSidebar() {
                this.pageOptions.pageMobileSidebarToggled = !this.pageOptions.pageMobileSidebarToggled;
            },
            toggleMobileRightSidebar() {
                this.pageOptions.pageMobileRightSidebarToggled = !this.pageOptions.pageMobileRightSidebarToggled;
            },
            toggleMobileTopMenu() {
                this.pageOptions.pageMobileTopMenu = !this.pageOptions.pageMobileTopMenu;
            },
            toggleMobileMegaMenu() {
                this.pageOptions.pageMobileMegaMenu = !this.pageOptions.pageMobileMegaMenu;
            },
            toggleRightSidebar() {
                this.pageOptions.pageRightSidebarToggled = !this.pageOptions.pageRightSidebarToggled;
            },
            toggleRightSidebarCollapsed() {
                this.pageOptions.pageRightSidebarCollapsed = !this.pageOptions.pageRightSidebarCollapsed;
            },
            checkForm: function (e) {
                e.preventDefault();
                this.$router.push({path: '/extra/search'});
            }
        }
    };
</script>
