import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const authStore = useAuthStore();
const viewMode = ref(true); // Toggle between view and edit modes
const formData = ref({
    full_name: authStore.profile?.full_name || '',
    user_type: authStore.profile?.user_type || '',
    country: authStore.profile?.location?.split(', ')[1] || '',
    city_or_town: authStore.profile?.location?.split(', ')[0] || '',
    business_name: authStore.profile?.business_name || '',
    service_type: authStore.profile?.service_type || '',
});
const errors = ref({
    full_name: '',
    user_type: '',
    country: '',
    city_or_town: '',
    business_name: '',
    service_type: '',
});
const toggleEditMode = () => {
    viewMode.value = !viewMode.value;
};
const validateForm = () => {
    Object.keys(errors.value).forEach(key => (errors.value[key] = ''));
    let valid = true;
    if (!formData.value.full_name) {
        errors.value.full_name = 'Full name is required.';
        valid = false;
    }
    if (!formData.value.country) {
        errors.value.country = 'Country is required.';
        valid = false;
    }
    if (!formData.value.city_or_town) {
        errors.value.city_or_town = 'City or town is required.';
        valid = false;
    }
    if (formData.value.user_type === 'vendor') {
        if (!formData.value.business_name) {
            errors.value.business_name = 'Business name is required for vendors.';
            valid = false;
        }
        if (!formData.value.service_type) {
            errors.value.service_type = 'Service type is required for vendors.';
            valid = false;
        }
    }
    return valid;
};
const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }
    try {
        const updates = {
            full_name: formData.value.full_name,
            user_type: formData.value.user_type,
            location: `${formData.value.city_or_town}, ${formData.value.country}`,
            business_name: formData.value.business_name,
            service_type: formData.value.service_type,
        };
        await authStore.updateProfile(updates);
        alert('Profile updated successfully!');
        toggleEditMode();
    }
    catch (error) {
        console.error('Failed to update profile:', error);
        alert('Something went wrong. Please try again later.');
    }
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sm:mx-auto sm:w-full sm:max-w-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("mt-6 text-center text-4xl font-extrabold text-blue-900") }, });
    (__VLS_ctx.viewMode ? 'Your Profile' : 'Update Your Profile');
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-2 text-center text-sm text-blue-700") }, });
    (__VLS_ctx.viewMode
        ? 'Here is your current profile information.'
        : 'Update your profile to keep it accurate and complete.');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 sm:mx-auto sm:w-full sm:max-w-2xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded-lg shadow-lg overflow-hidden") }, });
    if (__VLS_ctx.viewMode) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-8 space-y-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold text-gray-800") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 space-y-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.authStore.profile?.full_name || 'N/A');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.authStore.profile?.location || 'N/A');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.authStore.profile?.user_type || 'N/A');
        if (__VLS_ctx.authStore.profile?.user_type === 'vendor') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold text-gray-800") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 space-y-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (__VLS_ctx.authStore.profile?.business_name || 'N/A');
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (__VLS_ctx.authStore.profile?.service_type || 'N/A');
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 flex justify-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleEditMode) }, ...{ class: ("inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSubmit) }, ...{ class: ("p-8 space-y-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("full-name"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("full-name"), value: ((__VLS_ctx.formData.full_name)), type: ("text"), placeholder: ("Enter your full name"), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.full_name })) }, });
        if (__VLS_ctx.errors.full_name) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
            (__VLS_ctx.errors.full_name);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 sm:grid-cols-2 gap-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("country"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("country"), value: ((__VLS_ctx.formData.country)), type: ("text"), placeholder: ("Enter your country"), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.country })) }, });
        if (__VLS_ctx.errors.country) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
            (__VLS_ctx.errors.country);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("city-or-town"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("city-or-town"), value: ((__VLS_ctx.formData.city_or_town)), type: ("text"), placeholder: ("Enter your city or town"), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.city_or_town })) }, });
        if (__VLS_ctx.errors.city_or_town) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
            (__VLS_ctx.errors.city_or_town);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("user-type"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ id: ("user-type"), value: ((__VLS_ctx.formData.user_type)), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.user_type })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), disabled: (true), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("planner"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("vendor"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("venue_manager"), });
        if (__VLS_ctx.errors.user_type) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
            (__VLS_ctx.errors.user_type);
        }
        if (__VLS_ctx.formData.user_type === 'vendor') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-6") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("business-name"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("business-name"), value: ((__VLS_ctx.formData.business_name)), type: ("text"), placeholder: ("Enter your business name"), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.business_name })) }, });
            if (__VLS_ctx.errors.business_name) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
                (__VLS_ctx.errors.business_name);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("service-type"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ id: ("service-type"), value: ((__VLS_ctx.formData.service_type)), required: (true), ...{ class: ("mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm") }, ...{ class: (({ 'border-red-500': __VLS_ctx.errors.service_type })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), disabled: (true), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("catering"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("photography"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("music"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("decor"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("planning"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("other"), });
            if (__VLS_ctx.errors.service_type) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-red-600") }, });
                (__VLS_ctx.errors.service_type);
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 flex justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleEditMode) }, type: ("button"), ...{ class: ("px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500") }, });
    }
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['bg-gradient-to-r'];
    __VLS_styleScopedClasses['from-blue-50'];
    __VLS_styleScopedClasses['to-blue-100'];
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
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['font-extrabold'];
    __VLS_styleScopedClasses['text-blue-900'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-blue-700'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['sm:mx-auto'];
    __VLS_styleScopedClasses['sm:w-full'];
    __VLS_styleScopedClasses['sm:max-w-2xl'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['sm:grid-cols-2'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['focus:border-blue-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['border-red-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['hover:bg-gray-600'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-400'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
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
            viewMode: viewMode,
            formData: formData,
            errors: errors,
            toggleEditMode: toggleEditMode,
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
