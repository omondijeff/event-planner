import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
// Correct Heroicons imports
import { HomeIcon, ShoppingBagIcon, BuildingStorefrontIcon, ClipboardDocumentIcon, BuildingOfficeIcon, ArrowRightOnRectangleIcon, } from '@heroicons/vue/24/solid';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const authStore = useAuthStore();
const router = useRouter();
function logout() {
    authStore.logout();
    router.push('/login');
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("h-screen flex flex-col bg-gray-900 text-white w-64") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center justify-center h-20 border-b border-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/logo.png"), alt: ("Logo"), ...{ class: ("h-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("flex-1 px-4 py-6 space-y-2") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/dashboard"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/dashboard' })) }, }));
    const __VLS_2 = __VLS_1({ to: ("/dashboard"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/dashboard' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.HomeIcon;
    /** @type { [typeof __VLS_components.HomeIcon, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("w-5 h-5 text-gray-400") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("w-5 h-5 text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-3") }, });
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    if (__VLS_ctx.authStore.profile?.user_type === 'vendor') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/vendor-dashboard"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/vendor-dashboard' })) }, }));
        const __VLS_14 = __VLS_13({ to: ("/vendor-dashboard"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/vendor-dashboard' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.ShoppingBagIcon;
        /** @type { [typeof __VLS_components.ShoppingBagIcon, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("w-5 h-5 text-gray-400") }, }));
        const __VLS_20 = __VLS_19({ ...{ class: ("w-5 h-5 text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-3") }, });
        __VLS_nonNullable(__VLS_17.slots).default;
        var __VLS_17;
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/venues"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/venues' })) }, }));
        const __VLS_26 = __VLS_25({ to: ("/venues"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/venues' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.BuildingStorefrontIcon;
        /** @type { [typeof __VLS_components.BuildingStorefrontIcon, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("w-5 h-5 text-gray-400") }, }));
        const __VLS_32 = __VLS_31({ ...{ class: ("w-5 h-5 text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-3") }, });
        __VLS_nonNullable(__VLS_29.slots).default;
        var __VLS_29;
    }
    if (__VLS_ctx.authStore.profile?.user_type === 'planner') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ to: ("/bookings"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/bookings' })) }, }));
        const __VLS_38 = __VLS_37({ to: ("/bookings"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/bookings' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.ClipboardDocumentIcon;
        /** @type { [typeof __VLS_components.ClipboardDocumentIcon, ] } */
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("w-5 h-5 text-gray-400") }, }));
        const __VLS_44 = __VLS_43({ ...{ class: ("w-5 h-5 text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-3") }, });
        __VLS_nonNullable(__VLS_41.slots).default;
        var __VLS_41;
    }
    if (__VLS_ctx.authStore.profile?.user_type === 'venue_manager') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ to: ("/venues"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/venues' })) }, }));
        const __VLS_50 = __VLS_49({ to: ("/venues"), ...{ class: ("flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700") }, ...{ class: (({ 'bg-gray-800': __VLS_ctx.$route.path === '/venues' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.BuildingOfficeIcon;
        /** @type { [typeof __VLS_components.BuildingOfficeIcon, ] } */
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("w-5 h-5 text-gray-400") }, }));
        const __VLS_56 = __VLS_55({ ...{ class: ("w-5 h-5 text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-3") }, });
        __VLS_nonNullable(__VLS_53.slots).default;
        var __VLS_53;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("px-4 py-6 border-t border-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.logout) }, ...{ class: ("w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500") }, });
    const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.ArrowRightOnRectangleIcon;
    /** @type { [typeof __VLS_components.ArrowRightOnRectangleIcon, ] } */
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{ class: ("w-5 h-5 mr-2 text-white") }, }));
    const __VLS_62 = __VLS_61({ ...{ class: ("w-5 h-5 mr-2 text-white") }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['bg-gray-900'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['h-20'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-gray-700'];
    __VLS_styleScopedClasses['h-12'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-6'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['ml-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['ml-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['ml-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['ml-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['ml-3'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-6'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['border-gray-700'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-transparent'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-red-600'];
    __VLS_styleScopedClasses['hover:bg-red-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['focus:ring-red-500'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['text-white'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HomeIcon: HomeIcon,
            ShoppingBagIcon: ShoppingBagIcon,
            BuildingStorefrontIcon: BuildingStorefrontIcon,
            ClipboardDocumentIcon: ClipboardDocumentIcon,
            BuildingOfficeIcon: BuildingOfficeIcon,
            ArrowRightOnRectangleIcon: ArrowRightOnRectangleIcon,
            authStore: authStore,
            logout: logout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
