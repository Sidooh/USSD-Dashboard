<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { CONFIG } from '@/config';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import waffle from '@/assets/images/waffle.svg';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo.vue';
import MobileNav from '@/components/layout/MobileNav.vue';
import ModeToggle from '@/components/ModeToggle.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { HamburgerMenuIcon } from '@radix-icons/vue';

const waffleLinks = [
    {
        avatarText: 'A',
        title: 'Accounts',
        link: CONFIG.sidooh.services.accounts.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: CONFIG.sidooh.services.enterprise.dashboard.url,
        contentClass: 'bg-secondary-subtle text-secondary',
        enabled: false,
    },
    {
        avatarText: 'M',
        title: 'Merchants',
        link: CONFIG.sidooh.services.merchants.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: CONFIG.sidooh.services.notify.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
    {
        avatarText: 'p',
        title: 'Payments',
        link: CONFIG.sidooh.services.payments.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: CONFIG.sidooh.services.products.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
    {
        avatarText: 'S',
        title: 'Savings',
        link: CONFIG.sidooh.services.savings.dashboard.url,
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
    },
];

const showDropShadow = ref(false);

const toggleDropShadow = () => {
    const el = document.documentElement;

    showDropShadow.value = el.scrollTop > 0;
};

const showMobileMenu = ref(false);

const user = {
    name: 'Admin',
    email: 'international@sidooh.co.ke',
    image: null,
};

const handleSignOut = () => {
    // Implement sign out logic here
};

onMounted(() => {
    window.addEventListener('scroll', toggleDropShadow);
});

onUnmounted(() => {
    window.removeEventListener('scroll', toggleDropShadow);
});
</script>

<template>
    <header
        :class="
            cn('sticky top-0 z-40 bg-background', {
                'shadow-[0_.5rem_.5rem_-.5rem_#0003]': showDropShadow,
            })
        "
    >
        <div class="flex h-16 items-center justify-between md:justify-end py-4">
            <div class="flex md:hidden gap-6 md:gap-10">
                <router-link to="/" class="hidden items-center space-x-2 md:flex">
                    <Logo />
                </router-link>

                <button class="flex items-center space-x-2 md:hidden" @click="showMobileMenu = !showMobileMenu">
                    <Logo />
                    <font-awesome-icon :icon="faX" v-if="showMobileMenu" />
                    <HamburgerMenuIcon v-else />
                </button>
                <MobileNav v-show="showMobileMenu" @onClose="showMobileMenu = false" />
            </div>

            <div class="flex items-center space-x-2">
                <ModeToggle />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="icon" variant="ghost" class="rounded-full">
                            <img :src="waffle" alt="" width="15" height="15" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-72">
                        <ScrollArea>
                            <div class="grid grid-cols-3 gap-y-3">
                                <template v-for="l in waffleLinks" :key="l">
                                    <a
                                        :href="l.link"
                                        class="space-y-2 py-2 rounded-lg hover:bg-primary/10"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Avatar class="mx-auto">
                                            <AvatarFallback>{{ l.avatarText }}</AvatarFallback>
                                        </Avatar>
                                        <p class="mb-0 font-medium text-truncate text-xs text-center text-gray-800">
                                            {{ l.title }}
                                        </p>
                                    </a>
                                </template>
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar class="h-8 w-8">
                            <template v-if="user.image">
                                <AvatarImage alt="Picture" :src="user.image" />
                            </template>
                            <template v-else>
                                <AvatarFallback>
                                    <span class="sr-only">{{ user.name }}</span>
                                    <font-awesome-icon :icon="faUser" />
                                </AvatarFallback>
                            </template>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <div class="flex items-center justify-start gap-2 p-2">
                            <div class="flex flex-col space-y-1 leading-none">
                                <p class="font-medium" v-if="user.name">{{ user.name }}</p>
                                <p class="w-[200px] truncate text-sm text-muted-foreground" v-if="user.email">
                                    {{ user.email }}
                                </p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem as="link" to="/">Dashboard</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="cursor-pointer" @click.prevent="handleSignOut"
                            >Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
</template>
