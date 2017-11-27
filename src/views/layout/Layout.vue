<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<!-- 侧边导航  -->
		<sidebar class="sidebar-container"></sidebar>
		 <div class="main-container">
			 <!-- 顶部导航 -->
			<navbar></navbar>
			<!-- 主体内容 -->
			<app-main></app-main>
		</div> 
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from 'views/layout'

export default {
	name: 'layout',
	components: {
		Navbar,
		Sidebar,
		AppMain
	},
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "src/styles/mixin.scss";
.app-wrapper {
	// @include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.hideSidebar {
		.sidebar-container {
			width: 36px;
			overflow: inherit;
		}
		.main-container {
			margin-left: 36px;
		}
	}
	.sidebar-container {
		width: 180px;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1001;
		overflow-y: auto;
		&::-webkit-scrollbar {
			display: none
		}
	}
	.main-container {
		min-height: 100%;
		margin-left: 180px;
	}
}
</style>
