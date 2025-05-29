<script>
	import ErrorComponent from '$lib/components/error/ErrorComponent.svelte';
	import PageContainer from '$lib/components/page-container/PageContainer.svelte';
	import { MENU_SUBHEADER } from './consts';
</script>

<PageContainer headerText={MENU_SUBHEADER}>
	<ErrorComponent />
</PageContainer>
