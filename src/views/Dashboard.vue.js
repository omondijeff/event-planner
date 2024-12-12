import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
// Import Heroicons
import { HomeIcon, ArrowPathIcon, ExclamationCircleIcon, UserCircleIcon, InformationCircleIcon, EnvelopeIcon, MapPinIcon, TagIcon, CalendarIcon, } from '@heroicons/vue/24/solid';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const authStore = useAuthStore();
const loading = ref(true);
const error = ref(null);
onMounted(async () => {
    try {
        await authStore.initialize();
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    }
    finally {
        loading.value = false;
    }
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-h-screen bg-gray-50 py-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-3xl font-bold text-blue-900 flex items-center space-x-2") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.HomeIcon;
    /** @type { [typeof __VLS_components.HomeIcon, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("w-8 h-8 text-blue-600") }, }));
    const __VLS_2 = __VLS_1({ ...{ class: ("w-8 h-8 text-blue-600") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white shadow rounded-lg p-6") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center items-center text-gray-500") }, });
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ArrowPathIcon;
        /** @type { [typeof __VLS_components.ArrowPathIcon, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("animate-spin h-6 w-6 text-blue-500 mr-3") }, }));
        const __VLS_8 = __VLS_7({ ...{ class: ("animate-spin h-6 w-6 text-blue-500 mr-3") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center text-red-500") }, });
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.ExclamationCircleIcon;
        /** @type { [typeof __VLS_components.ExclamationCircleIcon, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: ("w-8 h-8 text-red-500 mx-auto mb-2") }, }));
        const __VLS_14 = __VLS_13({ ...{ class: ("w-8 h-8 text-red-500 mx-auto mb-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.error);
    }
    else if (__VLS_ctx.authStore.profile) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold text-gray-900 flex items-center space-x-2") }, });
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.UserCircleIcon;
        /** @type { [typeof __VLS_components.UserCircleIcon, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("w-8 h-8 text-blue-500") }, }));
        const __VLS_20 = __VLS_19({ ...{ class: ("w-8 h-8 text-blue-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.authStore.profile.full_name || 'User');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500 capitalize") }, });
        (__VLS_ctx.authStore.profile.user_type);
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/profile-setup"), ...{ class: ("px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500") }, }));
        const __VLS_26 = __VLS_25({ to: ("/profile-setup"), ...{ class: ("px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_nonNullable(__VLS_29.slots).default;
        var __VLS_29;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("border-t pt-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-lg font-semibold text-gray-900 flex items-center space-x-2") }, });
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.InformationCircleIcon;
        /** @type { [typeof __VLS_components.InformationCircleIcon, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("w-6 h-6 text-blue-500") }, }));
        const __VLS_32 = __VLS_31({ ...{ class: ("w-6 h-6 text-blue-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dl, __VLS_intrinsicElements.dl)({ ...{ class: ("mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({ ...{ class: ("text-sm font-medium text-gray-500 flex items-center space-x-2") }, });
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.EnvelopeIcon;
        /** @type { [typeof __VLS_components.EnvelopeIcon, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("w-6 h-6 text-blue-400") }, }));
        const __VLS_38 = __VLS_37({ ...{ class: ("w-6 h-6 text-blue-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({ ...{ class: ("mt-1 text-sm text-gray-900") }, });
        (__VLS_ctx.authStore.profile.email || 'Not set');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({ ...{ class: ("text-sm font-medium text-gray-500 flex items-center space-x-2") }, });
        const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.MapPinIcon;
        /** @type { [typeof __VLS_components.MapPinIcon, ] } */
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("w-6 h-6 text-blue-400") }, }));
        const __VLS_44 = __VLS_43({ ...{ class: ("w-6 h-6 text-blue-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({ ...{ class: ("mt-1 text-sm text-gray-900") }, });
        (__VLS_ctx.authStore.profile.location || 'Not set');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({ ...{ class: ("text-sm font-medium text-gray-500 flex items-center space-x-2") }, });
        const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.TagIcon;
        /** @type { [typeof __VLS_components.TagIcon, ] } */
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("w-6 h-6 text-blue-400") }, }));
        const __VLS_50 = __VLS_49({ ...{ class: ("w-6 h-6 text-blue-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({ ...{ class: ("mt-1 text-sm text-gray-900 capitalize") }, });
        (__VLS_ctx.authStore.profile.user_type);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dt, __VLS_intrinsicElements.dt)({ ...{ class: ("text-sm font-medium text-gray-500 flex items-center space-x-2") }, });
        const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.CalendarIcon;
        /** @type { [typeof __VLS_components.CalendarIcon, ] } */
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("w-6 h-6 text-blue-400") }, }));
        const __VLS_56 = __VLS_55({ ...{ class: ("w-6 h-6 text-blue-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.dd, __VLS_intrinsicElements.dd)({ ...{ class: ("mt-1 text-sm text-gray-900") }, });
        (__VLS_ctx.authStore.profile.created_at
            ? new Date(__VLS_ctx.authStore.profile.created_at).toLocaleDateString()
            : 'Not available');
    }
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['bg-gray-50'];
    __VLS_styleScopedClasses['py-6'];
    __VLS_styleScopedClasses['max-w-7xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['sm:px-6'];
    __VLS_styleScopedClasses['lg:px-8'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-blue-900'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['text-blue-600'];
    __VLS_styleScopedClasses['max-w-7xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['sm:px-6'];
    __VLS_styleScopedClasses['lg:px-8'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['animate-spin'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['mr-3'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['capitalize'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['pt-4'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['gap-y-4'];
    __VLS_styleScopedClasses['sm:grid-cols-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-blue-400'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-blue-400'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-blue-400'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['capitalize'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-blue-400'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-900'];
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
            ArrowPathIcon: ArrowPathIcon,
            ExclamationCircleIcon: ExclamationCircleIcon,
            UserCircleIcon: UserCircleIcon,
            InformationCircleIcon: InformationCircleIcon,
            EnvelopeIcon: EnvelopeIcon,
            MapPinIcon: MapPinIcon,
            TagIcon: TagIcon,
            CalendarIcon: CalendarIcon,
            authStore: authStore,
            loading: loading,
            error: error,
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
