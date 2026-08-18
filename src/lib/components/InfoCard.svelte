<script>
    import { createEventDispatcher } from 'svelte';
    import { X } from 'lucide-svelte';

    export let preset = null;

    const dispatch = createEventDispatcher();

    let activeMetricIndex = 0;

    $: cardData = preset ? preset.card : null;
    $: activeMetric = cardData && cardData.metrics ? cardData.metrics[activeMetricIndex] : null;
    $: activeInfo = activeMetric ? (activeMetric.info || cardData.info || '') : (cardData ? cardData.info || '' : '');
    $: activeColor = activeMetric ? (activeMetric.color || preset?.color || '#f97316') : (preset?.color || '#f97316');

    $: if (preset) {
        activeMetricIndex = 0;
    }

    function closeCard() {
        dispatch('close');
    }

    function selectMetric(index) {
        activeMetricIndex = index;
    }

    function padNumber(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
</script>

{#if preset && cardData}
    <div 
        class="editorial-info-card pos-{cardData.position || 'top-left'}"
        style="--active-accent-color: {activeColor}"
    >
        <div class="card-header">
            <div class="card-title-group">
                <div class="card-title">{cardData.title || preset.name}</div>
                <div class="card-subtitle">{cardData.subtitle || 'Production Area Info'}</div>
            </div>
            <button class="card-close-btn" title="Tutup Card" on:click={closeCard}>
                <X size={14} />
            </button>
        </div>

        <div class="morph-bar" style="background-color: {activeColor};"></div>

        <div class="card-body">
            {#if cardData.metrics && cardData.metrics.length > 0}
                <div class="numeral-rail">
                    {#each cardData.metrics as m, idx}
                        {@const color = m.color || preset.color || '#38bdf8'}
                        {@const isSelected = idx === activeMetricIndex}
                        <button 
                            class="numzone {isSelected ? 'active' : ''}" 
                            on:click={() => selectMetric(idx)}
                        >
                            <span 
                                class="bar-accent" 
                                style="background-color: {isSelected ? color : 'rgba(255, 255, 255, 0.15)'};"
                            ></span>
                            <span 
                                class="numeral" 
                                style="color: {isSelected ? color : '#7c93ad'};"
                            >
                                {padNumber(idx + 1)}
                            </span>
                        </button>
                    {/each}
                </div>
            {/if}

            <div class="content-col">
                <div class="content-label" style="color: {activeColor};">
                    {activeMetric ? (activeMetric.value || activeMetric.label || `STEP 0${activeMetricIndex + 1}`) : 'INFO'}
                </div>
                
                {#if activeInfo}
                    <div class="content-body">
                        {@html activeInfo}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .editorial-info-card {
        position: absolute;
        z-index: 120;
        width: min(450px, calc(100vw - 48px));
        max-height: calc(100vh - 120px);
        display: flex;
        flex-direction: column;
        background: #0d1b2a;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.25rem 1.5rem;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 240, 255, 0.12);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        font-family: 'Space Grotesk', sans-serif;
        animation: cardPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
    }

    @keyframes cardPopIn {
        from {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .editorial-info-card.pos-top-left { top: 24px; left: 24px; }
    .editorial-info-card.pos-top-right { top: 24px; right: 24px; }
    .editorial-info-card.pos-bottom-left { bottom: 95px; left: 24px; }
    .editorial-info-card.pos-bottom-right { bottom: 80px; right: 24px; }

    .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        flex-shrink: 0;
    }

    .card-title {
        font-weight: 500;
        font-size: 16px;
        color: #eaf2fb;
    }

    .card-subtitle {
        font-size: 12px;
        color: #7c93ad;
        margin-top: 2px;
    }

    .card-close-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        cursor: pointer;
        width: 26px;
        height: 26px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .card-close-btn:hover {
        color: #ffffff;
        background: rgba(244, 63, 94, 0.3);
        border-color: rgba(244, 63, 94, 0.6);
        transform: scale(1.1);
    }

    .morph-bar {
        height: 3px;
        border-radius: 2px;
        margin: 14px 0 16px;
        transition: background-color 0.4s ease;
        flex-shrink: 0;
    }

    .card-body {
        display: flex;
        gap: 18px;
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    .numeral-rail {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex-shrink: 0;
    }

    .numzone {
        display: flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 6px 2px;
        text-align: left;
    }

    .bar-accent {
        width: 2px;
        height: 14px;
        border-radius: 1px;
        transition: background-color .3s ease, height .3s ease;
    }

    .numeral {
        font-family: 'JetBrains Mono', monospace;
        font-size: 16px;
        font-weight: 400;
        transition: color .3s ease, transform .3s ease, font-size .3s ease;
    }

    .numzone:hover .numeral {
        filter: brightness(1.2);
    }

    .numzone.active .bar-accent {
        height: 26px;
    }

    .numzone.active .numeral {
        font-size: 22px;
        font-weight: 500;
        transform: translateX(2px);
    }

    .content-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
    }

    .content-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.05em;
        margin-bottom: 6px;
        text-transform: uppercase;
        font-weight: 600;
        transition: color .3s ease;
        flex-shrink: 0;
    }

    .content-body {
        font-size: 13.5px;
        line-height: 1.75;
        color: #b8c9db;
        transition: opacity .2s ease, transform .2s ease;
        overflow-y: auto;
        overflow-x: hidden;
        overflow-wrap: break-word;
        word-break: break-word;
        padding-right: 8px;
        max-height: 380px;
        scrollbar-width: thin;
        scrollbar-color: var(--active-accent-color, rgba(56, 189, 248, 0.4)) rgba(255, 255, 255, 0.03);
    }

    .content-body::-webkit-scrollbar {
        width: 4px;
    }

    .content-body::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 4px;
    }

    .content-body::-webkit-scrollbar-thumb {
        background: var(--active-accent-color, rgba(56, 189, 248, 0.5));
        border-radius: 4px;
    }

    .content-body::-webkit-scrollbar-thumb:hover {
        background: var(--active-accent-color, rgba(56, 189, 248, 0.9));
    }

    :global(.content-body a) {
        text-decoration: underline;
        text-underline-offset: 2px;
        font-weight: 500;
    }

    :global(.content-body strong) {
        color: #eaf2fb;
        font-weight: 500;
    }

    :global(.content-body img) {
        max-width: 100%;
        margin: 10px 0;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    :global(.content-body ul) {
        margin-left: 16px;
        margin-top: 6px;
    }

    :global(.content-body li) {
        margin-bottom: 4px;
    }

    :global(.content-body .img-grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 14px;
    }

    :global(.content-body .img-box) {
        aspect-ratio: 4 / 3;
        background: #142639;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4a5f76;
        font-size: 22px;
    }

    :global(.content-body .img-caption) {
        font-size: 11px;
        color: #7c93ad;
        margin-top: 4px;
    }

    :global(.content-body .div-row) {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    :global(.content-body .div-row:last-child) {
        border-bottom: none;
    }

    :global(.content-body .div-icon) {
        font-size: 16px;
        margin-top: 1px;
        flex-shrink: 0;
    }

    :global(.content-body .div-name) {
        font-size: 12px;
        font-weight: 500;
        color: #eaf2fb;
    }

    :global(.content-body .div-desc) {
        font-size: 12.5px;
        color: #b8c9db;
    }
</style>
