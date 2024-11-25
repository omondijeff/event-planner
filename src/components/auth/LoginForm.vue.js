import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
async function handleSubmit() {
    await authStore.login(email.value, password.value);
    if (authStore.isAuthenticated) {
        router.push('/dashboard');
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sm:mx-auto sm:w-full sm:max-w-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("mt-6 text-center text-3xl font-extrabold text-primary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-2 text-center text-sm text-secondary") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/register"), ...{ class: ("font-medium text-primary hover:text-primary-dark") }, }));
    const __VLS_2 = __VLS_1({ to: ("/register"), ...{ class: ("font-medium text-primary hover:text-primary-dark") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 sm:mx-auto sm:w-full sm:max-w-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white py-8 px-6 shadow rounded-lg sm:px-10") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSubmit) }, ...{ class: ("space-y-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("email"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-1") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("email"), name: ("email"), type: ("email"), autocomplete: ("email"), required: (true), ...{ class: ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm") }, });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("password"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-1") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("password"), name: ("password"), type: ("password"), autocomplete: ("current-password"), required: (true), ...{ class: ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm") }, });
    (__VLS_ctx.password);
    if (__VLS_ctx.authStore.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-red-500 text-sm") }, });
        (__VLS_ctx.authStore.error);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), disabled: ((__VLS_ctx.authStore.loading)), ...{ class: ("w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 flex items-center justify-between") }, });
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/forgot-password"), ...{ class: ("text-sm text-primary hover:text-primary-dark") }, }));
    const __VLS_8 = __VLS_7({ to: ("/forgot-password"), ...{ class: ("text-sm text-primary hover:text-primary-dark") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_nonNullable(__VLS_11.slots).default;
    var __VLS_11;
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['bg-background'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['py-12'];
    __VLS_styleScopedClasses['sm:px-6'];
    __VLS_styleScopedClasses['lg:px-8'];
    __VLS_styleScopedClasses['sm:mx-auto'];
    __VLS_styleScopedClasses['sm:w-full'];
    __VLS_styleScopedClasses['sm:max-w-md'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-extrabold'];
    __VLS_styleScopedClasses['text-primary'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-secondary'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-primary'];
    __VLS_styleScopedClasses['hover:text-primary-dark'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['sm:mx-auto'];
    __VLS_styleScopedClasses['sm:w-full'];
    __VLS_styleScopedClasses['sm:max-w-md'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['py-8'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['sm:px-10'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['appearance-none'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-primary'];
    __VLS_styleScopedClasses['focus:border-primary'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['appearance-none'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-primary'];
    __VLS_styleScopedClasses['focus:border-primary'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
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
    __VLS_styleScopedClasses['bg-primary'];
    __VLS_styleScopedClasses['hover:bg-primary-dark'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['focus:ring-primary'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-primary'];
    __VLS_styleScopedClasses['hover:text-primary-dark'];
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
            authStore: authStore,
            email: email,
            password: password,
            handleSubmit: handleSubmit,
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
