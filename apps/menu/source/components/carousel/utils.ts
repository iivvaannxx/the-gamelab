import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";

/**
 * Adds dot navigation functionality to an Embla Carousel.
 * @param emblaApi - The Embla Carousel API instance.
 * @param dotsWrapper - The HTML element that wraps the dot navigation.
 *
 * @returns A function that removes the dot navigation.
 */
export function addDotNavigation(
  emblaApi: EmblaCarouselType,
  dotsWrapper: HTMLElement,
) {
  // Setup scroll on click.
  let dotNodes = [] as HTMLButtonElement[];

  /** Creates the dot navigation buttons based on the scroll snap list. */
  const createDots = () => {
    dotsWrapper.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => {
        const button = document.createElement("button");
        button.classList.add("embla__dot");

        return button.outerHTML;
      })
      .join("");

    dotNodes = [...dotsWrapper.querySelectorAll("button.embla__dot")];
    dotNodes.forEach((dotNode, i) => {
      dotNode.addEventListener("click", () => emblaApi.scrollTo(i), false);
    });
  };

  /** Toggles the active state of the dots based on the current scroll position. */
  const toggleDotActiveState = () => {
    const prev = emblaApi.previousScrollSnap();
    const next = emblaApi.selectedScrollSnap();

    dotNodes[prev]?.classList.remove("embla__dot--selected");
    dotNodes[next]?.classList.add("embla__dot--selected");
  };

  // Attach event listeners to Embla Carousel events.
  emblaApi
    .on("init", createDots)
    .on("reInit", createDots)
    .on("init", toggleDotActiveState)
    .on("reInit", toggleDotActiveState)
    .on("select", toggleDotActiveState);

  /** Removes the dot navigation. */
  return () => {
    dotsWrapper.innerHTML = "";
  };
}

/**
 * Adds arrow navigation functionality to an Embla Carousel instance.
 *
 * @param emblaApi - The Embla Carousel instance.
 * @param prevButton - The previous button element.
 * @param nextButton - The next button element.
 * @returns A function that removes the arrow navigation functionality.
 */
export function addArrowNavigation(
  emblaApi: EmblaCarouselType,
  prevButton: HTMLButtonElement,
  nextButton: HTMLButtonElement,
) {
  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();
  prevButton.addEventListener("click", scrollPrev);
  nextButton.addEventListener("click", scrollNext);

  /** Toggles the button state depending on the current carousel state. */
  const toggleBtnsState = () => {
    if (emblaApi.canScrollPrev()) {
      prevButton.removeAttribute("disabled");
    } else {
      prevButton.setAttribute("disabled", "");
    }

    if (emblaApi.canScrollNext()) {
      nextButton.removeAttribute("disabled");
    } else {
      nextButton.setAttribute("disabled", "");
    }
  };

  emblaApi
    .on("select", toggleBtnsState)
    .on("init", toggleBtnsState)
    .on("reInit", toggleBtnsState);

  return () => {
    prevButton.removeAttribute("disabled");
    nextButton.removeAttribute("disabled");
    prevButton.removeEventListener("click", scrollPrev);
    nextButton.removeEventListener("click", scrollNext);
  };
}

/**
 * Sets up a tween scaling effect on the slides of an Embla Carousel
 *
 * @param emblaApi - The Embla Carousel API instance.
 * @param tweenFactorBase - The base factor for the tween scaling. Higher values mean less scaling (items more small).
 * @returns A function that removes the tween scaling effect.
 */
export function setupTweenScale(
  emblaApi: EmblaCarouselType,
  tweenFactorBase = 0.52,
) {
  let tweenFactor = 0;
  let tweenNodes = [] as HTMLElement[];

  /** Queries the nodes where the tween will be applied. */
  const setTweenNodes = () => {
    // The wrapper element of each slide.
    tweenNodes = emblaApi.slideNodes().map((node) => {
      return node.children[0] as HTMLElement;
    });
  };

  /** Sets the tween (scaling) factor. */
  const setTweenFactor = () => {
    tweenFactor = tweenFactorBase * emblaApi.scrollSnapList().length;
  };

  /** Performs the actual scaling on each node. */
  const tweenScale = (eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const progress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((snap, index) => {
      let diffToTarget = snap - progress;
      const slidesInSnap = engine.slideRegistry[index];

      for (const slide of slidesInSnap) {
        if (isScrollEvent && !slidesInView.includes(slide)) {
          return;
        }

        if (engine.options.loop) {
          for (const loopItem of engine.slideLooper.loopPoints) {
            const target = loopItem.target();

            if (slide === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              diffToTarget = snap + sign * (1 - progress);
            }
          }
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
        tweenNodes[slide].style.transform = `scale(${Math.min(
          Math.max(tweenValue, 0),
          1,
        )})`;
      }
    });
  };

  setTweenNodes();
  setTweenFactor();
  tweenScale();

  const tweenScaleHandler = (
    _api: EmblaCarouselType,
    event: EmblaEventType,
  ) => {
    tweenScale(event);
  };

  emblaApi
    .on("reInit", setTweenNodes)
    .on("reInit", setTweenFactor)
    .on("reInit", tweenScaleHandler)
    .on("scroll", tweenScaleHandler)
    .on("slideFocus", tweenScaleHandler);

  return () => {
    for (const slide of tweenNodes) {
      slide.style.transform = "";
    }
  };
}
