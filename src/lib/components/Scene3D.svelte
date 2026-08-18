<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { createThreeEngine } from '../threeEngine.js';
    import { sitePoints } from '../../config/config-points.js';

    export let activeCategory = 'produksi';
    export let selectedPresetId = null;

    const dispatch = createEventDispatcher();

    let container;
    let engine = null;
    let markers = [];
    let rafId = null;

    $: filteredPresets = sitePoints.filter(p => (p.class || 'produksi').toLowerCase() === activeCategory.toLowerCase());

    onMount(() => {
        if (container) {
            engine = createThreeEngine(container, {
                onReset: () => {
                    selectedPresetId = null;
                    dispatch('presetSelect', null);
                }
            });

            const updateMarkersLoop = () => {
                if (engine) {
                    markers = filteredPresets.map(preset => {
                        const coords = engine.project3DTo2D(preset.pin?.col || 45, preset.pin?.row || 45, 0.2);
                        return {
                            preset,
                            coords
                        };
                    });
                }
                rafId = requestAnimationFrame(updateMarkersLoop);
            };

            updateMarkersLoop();
            window.addEventListener('resize', handleResize);
        }
    });

    onDestroy(() => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleResize);
        if (engine) engine.destroy();
    });

    function handleResize() {
        if (engine) engine.onResize();
    }

    function selectPreset(presetId) {
        if (engine) {
            const preset = engine.applyPreset(presetId);
            selectedPresetId = presetId;
            dispatch('presetSelect', preset);
        }
    }

    export function reset2D() {
        if (engine) {
            engine.reset2D();
            selectedPresetId = null;
            dispatch('presetSelect', null);
        }
    }

    export function switchCategory(catName) {
        if (engine) {
            engine.switchCategory(catName);
            selectedPresetId = null;
            dispatch('presetSelect', null);
        }
    }

    export function zoomIn() {
        if (engine) engine.zoomIn();
    }

    export function zoomOut() {
        if (engine) engine.zoomOut();
    }

    export function fitView() {
        if (engine) engine.fitView();
    }

    export function focusTarget() {
        if (engine) {
            const preset = engine.focusCurrentTarget();
            if (preset) {
                selectedPresetId = preset.id;
                dispatch('presetSelect', preset);
            }
        }
    }
</script>

<div id="map" class="layer-map-canvas" bind:this={container}></div>

<div id="ui-overlay" class="layer-btn-overlay">
    {#each markers as item, index}
        {#if item.coords}
            <button 
                class="btn-marker-card {selectedPresetId === item.preset.id ? 'active' : ''}" 
                id="btn-{item.preset.id}"
                style="--active-color: {item.preset.color || '#38bdf8'}; left: {item.coords.x}px; top: {item.coords.y}px; animation-delay: {index * 45}ms;"
                on:click={(e) => { e.stopPropagation(); selectPreset(item.preset.id); }}
            >
                <div class="marker-dot-wrapper">
                    <span class="marker-pulse"></span>
                    <span class="marker-dot"></span>
                </div>
                <span class="marker-label">{item.preset.name}</span>
            </button>
        {/if}
    {/each}
</div>
