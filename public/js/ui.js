// /public/js/ui.js

customElements.define('ui-nav', class extends HTMLElement {
	constructor () {
		super();
		const pages = [
			//{label:'Home', url:'./index.html'},
			{label:'Services', url:'#services'},
			{label:'R&D',url:'#rand'},
			{label:'About', url:'#about'},
		];
		const currentPage = this.getAttribute('current-page');
	
		let homeLogo = `<svg height="18" viewBox="0 0 178 134" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:.5rem;">
		            <path fill-rule="evenodd" clip-rule="evenodd" d="M89.0003 0.562012L177.584 89.1459L139.069 127.661L50.4854 39.0769L89.0003 0.562012ZM38.9312 50.6312L83.223 94.9233L44.7083 133.438L0.41626 89.1459L38.9312 50.6312Z" fill="var(--pico-contrast)" class="logo-glyph"/>
		        </svg>`;
		let navStr = pages.map((p) => `<a href="${p.url}" role="button" class="ghost ${currentPage==p.label?'primary':'contrast'}">${p.label}</a>`).join('');
		
		this.innerHTML = `
<style>
	.mainNav {
		position:fixed; 
		z-index:9999;
		left: 50%;
		right: 50%;
		transform: translateX(-50%);
		width: max-content;
	}
	[data-tabset="main"] {
		position:relative; 
		transform: translateY(0);
		transition: transform 0.3s ease-in-out;
		
	}
	.scrollAway {transform: translateY(-200px)}

</style>
<div class="dif mainNav p-sm">
	<article data-tabset="main" class="df jc-fs ai-c p-0">
		<a href="./index.html" role="button" class="ghost ${currentPage=='Home'?'primary':'contrast'}">${homeLogo}</a>
		<div class="df gap-0">${navStr}</div>
		<!--
		<a href="" role="button" class="ghost"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" height="24" focusable="false">
	      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
	    </svg></a>
		<a href="" role="button" class="ghost"><svg height="20" viewBox="0 0 29 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.4844 0C14.4844 0 23.5698 0.000351548 25.8232 0.610352C27.0917 0.940423 28.0459 1.89993 28.3809 3.13965C29.0001 5.33965 29 9.98047 29 9.98047C29 10.034 28.9965 14.663 28.3809 16.8701C28.046 18.08 27.0919 19.0603 25.8232 19.4004C23.5698 20.0004 14.4844 20 14.4844 20C14.4131 20 5.41114 19.998 3.17676 19.4004C1.92837 19.0603 0.953889 18.08 0.598633 16.8701C0.00322373 14.663 1.99997e-05 10.034 0 9.98047C0 9.98047 -0.00024718 5.33965 0.598633 3.13965C0.953923 1.89991 1.92853 0.940432 3.17676 0.610352C5.41114 0.00276684 14.4131 9.52546e-06 14.4844 0ZM11.5 14.25L19 10L11.5 5.75V14.25Z"/>
			</svg>
		</a>
		 <button class="d-f fd-r ai-c g-3"><span class="material-symbols-outlined">calendar_add_on</span> <span class="hide-sm">Book a Call</span> </button> 
		-->
	</article>
</div>`;
		let lastScrollTop = 0;
		const scrollThreshold = 100; // scroll distance before hiding
		const scrollUpThreshold = 0; // scroll distance for showing
		window.addEventListener('scroll', function() {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
				document.querySelector('[data-tabset="main"]').classList.add('scrollAway');
			} else if (scrollTop < lastScrollTop - scrollUpThreshold){
				document.querySelector('[data-tabset="main"]').classList.remove('scrollAway');
			}

			lastScrollTop = scrollTop;
		});
	}
});