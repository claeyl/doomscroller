interface NavigateEvent extends Event {
  destination: {
    url: string;
  };
}

interface Navigation extends EventTarget {
  addEventListener(
    type: 'navigate',
    listener: (this: Navigation, e: NavigateEvent) => any
  ): void;
}

interface Window {
  navigation: Navigation;
}

declare var navigation: Navigation;
