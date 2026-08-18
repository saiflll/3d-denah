<script>
    import Scene3D from './lib/components/Scene3D.svelte';
    import InfoCard from './lib/components/InfoCard.svelte';
    import CategoryTabs from './lib/components/CategoryTabs.svelte';
    import Toolbar from './lib/components/Toolbar.svelte';
    import PinLock from './lib/components/PinLock.svelte';
    import SummaryFlowCard from './lib/components/SummaryFlowCard.svelte';

    let sceneComponent;
    let activeCategory = 'produksi';
    let activePreset = null;
    let selectedPresetId = null;

    function handleCategorySelect(e) {
        activeCategory = e.detail;
        activePreset = null;
        selectedPresetId = null;
        if (sceneComponent) sceneComponent.switchCategory(activeCategory);
    }

    function handlePresetSelect(e) {
        activePreset = e.detail;
        selectedPresetId = activePreset ? activePreset.id : null;
    }

    function handleCloseCard() {
        activePreset = null;
        selectedPresetId = null;
        if (sceneComponent) sceneComponent.reset2D();
    }

    function handleCloseSummary() {
        activeCategory = 'produksi';
        if (sceneComponent) sceneComponent.switchCategory('produksi');
    }
</script>

<main>
    <PinLock />

    <CategoryTabs 
        {activeCategory} 
        on:select={handleCategorySelect} 
    />

    <Scene3D 
        bind:this={sceneComponent}
        {activeCategory}
        {selectedPresetId}
        on:presetSelect={handlePresetSelect}
    />

    {#if activeCategory === 'summary'}
        <SummaryFlowCard on:close={handleCloseSummary} />
    {/if}

    <InfoCard 
        preset={activePreset} 
        on:close={handleCloseCard} 
    />

    <Toolbar 
        on:zoomIn={() => sceneComponent && sceneComponent.zoomIn()}
        on:zoomOut={() => sceneComponent && sceneComponent.zoomOut()}
        on:fitView={() => sceneComponent && sceneComponent.fitView()}
        on:focus={() => sceneComponent && sceneComponent.focusTarget()}
    />
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: #020611;
    }
</style>
