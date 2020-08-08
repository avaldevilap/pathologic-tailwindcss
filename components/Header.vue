<template>
  <nav class="bg-teal-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <nuxt-link
              active-class="active"
              class="font-semibold text-xl text-white tracking-tight app-brand"
              to="/"
            >
              Pathologic
            </nuxt-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <nuxt-link
                :to="{ name: 'patients', query: { page: 1 } }"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
              >
                Pacientes
              </nuxt-link>
              <nuxt-link
                :to="{ name: 'biopsies', query: { page: 1 } }"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
              >
                Biopsias
              </nuxt-link>
              <nuxt-link
                :to="{ name: 'cytologies', query: { page: 1 } }"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
              >
                Citologías
              </nuxt-link>
              <nuxt-link
                :to="{ name: 'necropsies', query: { page: 1 } }"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
              >
                Necropsias
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              class="p-1 border-2 border-transparent text-teal-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-teal-700"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  id="user-menu"
                  class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                  aria-label="User menu"
                  aria-haspopup="true"
                  @click="profileMenu = !profileMenu"
                >
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <!--
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-show="profileMenu"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                  <div
                    class="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Perfil
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Opciones
                    </a>
                    <a
                      class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      role="menuitem"
                      @click="$auth.logout()"
                    >
                      Salir
                    </a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 focus:text-white"
            @click="mobileMenu = !mobileMenu"
          >
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div :class="[!mobileMenu ? 'hidden' : 'block', 'md:hidden']">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <nuxt-link
          :to="{ name: 'patients', query: { page: 1 } }"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
        >
          Pacientes
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'biopsies', query: { page: 1 } }"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
        >
          Biopsias
        </nuxt-link>
        <a
          :to="{ name: 'cytologies', query: { page: 1 } }"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
        >
          Citologías
        </a>
        <a
          :to="{ name: 'necropsies', query: { page: 1 } }"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
        >
          Necropsias
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              Tom Cook
            </div>
            <div class="mt-1 text-sm font-medium leading-none text-gray-400">
              tom@example.com
            </div>
          </div>
        </div>
        <div class="mt-3 px-2">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
          >
            Perfil
          </a>
          <a
            href="#"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
          >
            Opciones
          </a>
          <a
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 cursor-pointer hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700"
            @click="$auth.logout()"
          >
            Salir
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      mobileMenu: false,
      profileMenu: false,
    };
  },
});
</script>

<style scoped>
.nuxt-link-active {
  @apply outline-none text-white bg-teal-700;
}
</style>
