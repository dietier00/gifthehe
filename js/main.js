document.addEventListener('DOMContentLoaded', () => {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const mobileLike = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(max-width: 960px)').matches;
	const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
	const flower = document.querySelector('#sticky-flower');
	const flowerFrame = document.querySelector('.flower-stage__frame');

	const hasGsap = typeof window.gsap !== 'undefined';
	const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
	const hasScrollSmoother = typeof window.ScrollSmoother !== 'undefined';

	if (!revealItems.length && !flower) {
		return;
	}

	if (!hasGsap || reducedMotion) {
		revealItems.forEach((element) => element.classList.add('is-visible'));
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	if (!mobileLike && hasScrollSmoother && document.querySelector('#smooth-wrapper') && document.querySelector('#smooth-content')) {
		ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.1,
			effects: true,
			normalizeScroll: true
		});
	}

	const revealOffset = mobileLike ? 18 : 28;
	const flowerStartScale = mobileLike ? 0.96 : 0.9;
	const flowerTravel = mobileLike ? -5 : -10;
	const flowerRotate = mobileLike ? 2.5 : 4;

	gsap.set(revealItems, { autoAlpha: 0, y: revealOffset });
	gsap.set('#sticky-flower', { autoAlpha: 0, scale: flowerStartScale, rotate: mobileLike ? -4 : -8 });

	const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

	intro
		.from('.eyebrow', { autoAlpha: 0, y: 12, duration: 0.5 })
		.from('.brand-lockup h1', { autoAlpha: 0, y: 28, duration: 0.8 }, '<0.08')
		.from('.header-note', { autoAlpha: 0, y: 16, duration: 0.6 }, '<0.08')
		.to('#sticky-flower', { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9 }, '<0.1');

	gsap.utils.toArray('[data-reveal]').forEach((element) => {
		gsap.to(element, {
			autoAlpha: 1,
			y: 0,
			duration: mobileLike ? 0.75 : 0.9,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: element,
				start: mobileLike ? 'top 90%' : 'top 82%',
				toggleActions: 'play none none reverse'
			}
		});
	});

	gsap.to('.orb-a', {
		xPercent: mobileLike ? -3 : -6,
		yPercent: mobileLike ? 8 : 12,
		ease: 'none',
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom top',
			scrub: true
		}
	});

	gsap.to('.orb-b', {
		xPercent: mobileLike ? 6 : 10,
		yPercent: mobileLike ? -6 : -10,
		ease: 'none',
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom top',
			scrub: true
		}
	});

	gsap.to('#sticky-flower', {
		yPercent: flowerTravel,
		rotate: flowerRotate,
		scale: mobileLike ? 1.03 : 1.06,
		ease: 'none',
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom top',
			scrub: true
		}
	});

	gsap.to('.flower-stage__frame', {
		rotate: mobileLike ? 0.4 : 1.2,
		yPercent: mobileLike ? -1 : -3,
		ease: 'none',
		scrollTrigger: {
			trigger: '.hero',
			start: 'top top',
			end: 'bottom top',
			scrub: true
		}
	});

	ScrollTrigger.refresh();
	window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
});

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("envelope-wrapper");
    const flap = document.getElementById("flap");
    const letter = document.getElementById("letter");

    let isOpen = false;

    // Timeline for coordinated opening/closing sequence
    const tl = gsap.timeline({ paused: true });

    tl.to(flap, {
        rotationX: 180,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
            // Drop z-index of flap behind the letter once flipped open
            flap.style.zIndex = "5";
        },
        onReverseComplete: () => {
            flap.style.zIndex = "30";
        }
    })
    .to(letter, {
        y: -120, // Slide letter upward out of envelope
        zIndex: 25,
        duration: 0.5,
        ease: "back.out(1.2)"
    }, "-=0.1");

    wrapper.addEventListener("click", () => {
        if (!isOpen) {
            tl.play();
            isOpen = true;
        } else {
            tl.reverse();
            isOpen = false;
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.getElementById("envelope-card");
    const modal = document.getElementById("letter-modal");
    const modalCard = document.getElementById("modal-card");
    const closeBtn = document.getElementById("close-modal");

    // Open Fullscreen Modal on Envelope Click
    envelope.addEventListener("click", () => {
        // Show overlay
        modal.classList.remove("opacity-0", "pointer-events-none");
        
        // GSAP Popup animation for modal card
        gsap.fromTo(modalCard, 
            { scale: 0.8, y: 30, opacity: 0 }, 
            { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }
        );
    });

    // Close Modal Function
    const closeModal = () => {
        gsap.to(modalCard, {
            scale: 0.85,
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.add("opacity-0", "pointer-events-none");
            }
        });
    };

    closeBtn.addEventListener("click", closeModal);
    
    // Close modal when clicking outside content area
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});