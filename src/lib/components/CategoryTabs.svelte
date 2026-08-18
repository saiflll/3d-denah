<script>
    import { createEventDispatcher } from 'svelte';

    export let activeCategory = 'produksi';

    const dispatch = createEventDispatcher();

    function selectCategory(cat) {
        if (cat !== activeCategory) {
            dispatch('select', cat);
        }
    }
</script>

<div id="category-tab-panel" class="panel-category-tabs vertical-stack">
    <button 
        class="cat-tab-btn {activeCategory === 'produksi' ? 'active' : ''}" 
        data-category="produksi"
        on:click={() => selectCategory('produksi')}
    >
        <span class="cat-dot"></span>
        <span class="cat-name">PRODUKSI</span>
    </button>

    <div class="cat-divider-line"></div>

    <button 
        class="cat-tab-btn {activeCategory === 'support' ? 'active' : ''}" 
        data-category="support"
        on:click={() => selectCategory('support')}
    >
        <span class="cat-dot"></span>
        <span class="cat-name">SUPPORT</span>
    </button>

    <div class="cat-divider-line"></div>

    <button 
        class="cat-tab-btn {activeCategory === 'summary' ? 'active' : ''}" 
        data-category="summary"
        on:click={() => selectCategory('summary')}
    >
        <span class="cat-dot" style="background-color: #38bdf8;"></span>
        <span class="cat-name">SUMMARY / BENEFIT</span>
    </button>
</div>
