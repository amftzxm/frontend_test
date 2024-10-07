import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav[navBar]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div
      class="w-dvw h-16 bg-teal-500 dark:bg-teal-900 flex items-center z-50 fixed top-0 "
    >
      <div class="ms-auto me-auto min-w-[90rem]">
        <div class="flex gap-3 ">
          @for (menu of menus(); track $index) {
          <a
            [routerLinkActive]="'dark:text-teal-200'"
            (isActiveChange)="onRouterLinkActive($event)"
            class="dark:text-white  text-white cursor-pointer hover:dark:text-teal-200"
            [routerLink]="menu.link"
            >{{ menu.label }}</a
          >
          }
        </div>
      </div>
    </div>
  `,
  styles: ['.active { border: solid; }'],
})
export class NavBarComponent {
  menus = signal([
    { label: 'Drag and Drop', link: 'dad' },
    { label: 'Dynamic Forms', link: 'df' },
    { label: 'Platform', link: 'platform' },
    { label: 'Employee', link: 'employee/1' },
    { label: 'poc', link: 'poc' },
    { label: 'scroll-to-item', link: 'scrollToItem' },
    { label: 'NGRX', link: 'ngrx' },
    { label: 'NGRX Signal Store', link: 'ngrx-signal-store' },
  ]);

  onRouterLinkActive(e: any) {
    // console.log(e);
  }

  constructor() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Whenever the user explicitly chooses light mode
    localStorage['theme'] = 'light';

    // Whenever the user explicitly chooses dark mode
    localStorage['theme'] = 'dark';

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme');
  }
}
