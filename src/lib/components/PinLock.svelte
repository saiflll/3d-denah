<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { CornerDownLeft } from 'lucide-svelte';

    const ACCESS_PIN = "ck32026";
    const dispatch = createEventDispatcher();

    let pinInput = '';
    let isError = false;
    let unlocked = false;

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
        <div class="pin-display-group">
            <span class="lock-dot"></span>
            <span class="pin-prompt">&gt;</span>
            <input 
                type="password" 
                id="pin-input" 
                maxlength="8" 
                placeholder="ENTER ACCESS KEY" 
                autocomplete="off"
                bind:value={pinInput}
                on:keydown={handleKeyDown}
            />
            <button class="pin-submit-btn" title="Submit" on:click={verifyPin}>
                <CornerDownLeft size={14} />
            </button>
        </div>
        <div id="lock-error-msg" class="lock-error {isError ? 'show' : ''}">ACCESS DENIED &bull; INVALID KEY</div>
    </div>
</div>
