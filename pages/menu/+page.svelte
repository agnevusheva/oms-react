<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import MenuList from '$lib/components/menu-list/MenuList.svelte';
	import PageContainer from '$lib/components/page-container/PageContainer.svelte';
	import Header from '$lib/components/typography/Header.svelte';
	import { MENU_SUBHEADER, SELECTED_ITEMS_SUBHEADER } from './consts.js';
	import { mapItemFromDTO } from './utils.js';
	export let data;

	const menuItems = data.items.map(mapItemFromDTO);
</script>

<PageContainer>
	<div class="content-container">
		<div class="menu-container">
			<Card>
				<Header level={3} text={MENU_SUBHEADER} />
				<MenuList {menuItems}></MenuList>
			</Card>
		</div>
		<div class="selected-items">
			<Card><Header level={3} text={SELECTED_ITEMS_SUBHEADER} /></Card>
		</div>
	</div>
</PageContainer>

<style>
	.content-container {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	.menu-container {
		width: 45%;
	}

	.selected-items {
		width: 45%;
	}
</style>
