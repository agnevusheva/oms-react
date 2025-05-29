<script>
	import TablesGrid from '$lib/components/layouts/TablesGrid.svelte';
	import PageContainer from '$lib/components/page-container/PageContainer.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import { ORDERS_HEADER } from '../consts';

	import { mapTableFromDTO } from './utils';

	export let data;
	const tables = data.tables.map(mapTableFromDTO);
</script>

<PageContainer headerText={ORDERS_HEADER}>
	<TablesGrid>
		{#each tables as { id, shape }}
			<Table {id} {shape} />
		{/each}
	</TablesGrid>
</PageContainer>
