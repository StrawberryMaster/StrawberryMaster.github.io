<script>
  import { onMount } from 'svelte';
</script>

<main>
  <header>
    <section>
      <figure class="avatar">
        <img src="images/SMDeadInHomestuck.png"
          alt="An image of StrawberryMaster as a Homestuck character; specifically Dave Strider with a sword on his chest, who has the Swiss flag in it, consisting of a + (plus) sign.">
        <figcaption>We are experiencing technical difficulties.</figcaption>
      </figure>
    </section>
    <h1>No page encountered</h1>
    <p>
      This isn't like Keglerton, you know. There is nothing here. Absolutely nothing. You can return to the previous
      page
      now by clicking the button below. Thank you, and have a nice day!
    </p>
  </header>
  <form>
    <input type="button" value="Return to the previous page" onClick="javascript:history.go(-1)" />
  </form>
</main>

<style>
  @import '../style.css';
</style>
