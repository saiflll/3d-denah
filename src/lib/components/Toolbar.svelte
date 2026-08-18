<script>
    import { createEventDispatcher } from 'svelte';
    import { ZoomIn, ZoomOut, Maximize2, Crosshair } from 'lucide-svelte';

    const dispatch = createEventDispatcher();
</script>

<div id="cam-ctrl-panel" class="panel-nav-ctrl">
    <button class="ctrl-btn" title="Perbesar (Zoom In)" on:click={() => dispatch('zoomIn')}>
        <ZoomIn size={16} />
    </button>

    <button class="ctrl-btn" title="Perkecil (Zoom Out)" on:click={() => dispatch('zoomOut')}>
        <ZoomOut size={16} />
    </button>

    <div class="ctrl-divider"></div>

    <button class="ctrl-btn" title="Pas Layar (Fit View)" on:click={() => dispatch('fitView')}>
        <Maximize2 size={16} />
    </button>

    <button class="ctrl-btn" title="Pusatkan Fokus (Focus Target)" on:click={() => dispatch('focus')}>
        <Crosshair size={16} />
    </button>
</div>
