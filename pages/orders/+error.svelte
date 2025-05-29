<script>
	import ErrorComponent from '$lib/components/error/ErrorComponent.svelte';
	import PageContainer from '$lib/components/page-container/PageContainer.svelte';
	import { ORDERS_HEADER } from '../consts';
</script>

<PageContainer headerText={ORDERS_HEADER}>
	<ErrorComponent />
</PageContainer>
