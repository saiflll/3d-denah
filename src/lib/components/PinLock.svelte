<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { CornerDownLeft, Lock } from 'lucide-svelte';

    const ACCESS_PIN = "ck32026";
    const dispatch = createEventDispatcher();

    let pinInput = '';
    let isError = false;
    let unlocked = false;

    $: maskAsterisks = Array(pinInput.length).fill('*').join(' ');

    onMount(() => {
        if (sessionStorage.getItem('cp3_auth_unlocked') === 'true') {
            unlocked = true;
            dispatch('unlock');
        }
    });

    function verifyPin() {
        if (pinInput.trim() === ACCESS_PIN) {
            sessionStorage.setItem('cp3_auth_unlocked', 'true');
            unlocked = true;
            isError = false;
            dispatch('unlock');
        } else {
            isError = true;
            pinInput = '';
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            verifyPin();
        }
    }
</script>

<div id="auth-lock-screen" class="lock-screen-overlay {unlocked ? 'unlocked' : ''}">
    <div class="lock-card">
        <div class="lock-header">
            <Lock size={12} class="lock-icon" />
            <span class="lock-title">FORMALITAS KEY</span>
        </div>
        <div class="pin-display-group">
            <span class="lock-dot"></span>
            <span class="pin-prompt">&gt;</span>
            <input 
                type="password" 
                id="pin-input" 
                maxlength="12" 
                placeholder="FORMALITAS KEY" 
                autocomplete="off"
                bind:value={pinInput}
                on:keydown={handleKeyDown}
            />
            <button class="pin-submit-btn" title="Submit" on:click={verifyPin}>
                <CornerDownLeft size={14} />
            </button>
        </div>

        {#if pinInput.length > 0}
            <div class="asterisk-preview">
                <span class="asterisk-dots">{maskAsterisks}</span>
                <span class="asterisk-count">({pinInput.length} *)</span>
            </div>
        {/if}

        <div id="lock-error-msg" class="lock-error {isError ? 'show' : ''}">ACCESS DENIED &bull; INVALID FORMALITAS KEY</div>
    </div>
</div>
