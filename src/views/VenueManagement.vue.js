import { ref, onMounted } from 'vue';
import { useVenueStore } from '@/stores/venue';
// Heroicons
import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const venueStore = useVenueStore();
const venues = ref(venueStore.venues);
const loading = ref(false);
const error = ref(null);
const showForm = ref(false);
const formData = ref({ id: '', name: '', location: '', capacity: null });
async function fetchVenues() {
    loading.value = true;
    try {
        await venueStore.fetchVenues('manager_id'); // Replace with actual manager ID
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    }
    finally {
        loading.value = false;
    }
}
function openCreateForm() {
    formData.value = { id: '', name: '', location: '', capacity: null };
    showForm.value = true;
}
function editVenue(venue) {
    formData.value = { ...venue };
    showForm.value = true;
}
async function saveVenue() {
    if (formData.value.id) {
        await venueStore.updateVenue(formData.value.id, formData.value);
    }
    else {
        await venueStore.createVenue({ ...formData.value, manager_id: 'manager_id' }); // Replace with manager ID
    }
    showForm.value = false;
}
async function deleteVenue(venueId) {
    await venueStore.deleteVenue(venueId);
}
function closeForm() {
    showForm.value = false;
}
onMounted(fetchVenues);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-2xl font-bold text-gray-900 mb-4") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-gray-500 flex items-center justify-center") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ArrowPathIcon;
        /** @type { [typeof __VLS_components.ArrowPathIcon, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("w-6 h-6 animate-spin mr-2") }, }));
        const __VLS_2 = __VLS_1({ ...{ class: ("w-6 h-6 animate-spin mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-red-500 text-center") }, });
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ExclamationCircleIcon;
        /** @type { [typeof __VLS_components.ExclamationCircleIcon, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("w-6 h-6 text-red-500 mx-auto mb-2") }, }));
        const __VLS_8 = __VLS_7({ ...{ class: ("w-6 h-6 text-red-500 mx-auto mb-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.error);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        if (__VLS_ctx.venues.length) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6") }, });
            for (const [venue] of __VLS_getVForSourceType((__VLS_ctx.venues))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((venue.id)), ...{ class: ("bg-white shadow rounded-lg p-4") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold text-gray-800") }, });
                (venue.name);
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500") }, });
                (venue.location);
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500") }, });
                (venue.capacity);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 flex justify-between") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!(!((__VLS_ctx.loading))))
                                return;
                            if (!(!((__VLS_ctx.error))))
                                return;
                            if (!((__VLS_ctx.venues.length)))
                                return;
                            __VLS_ctx.editVenue(venue);
                        } }, ...{ class: ("px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                            if (!(!((__VLS_ctx.loading))))
                                return;
                            if (!(!((__VLS_ctx.error))))
                                return;
                            if (!((__VLS_ctx.venues.length)))
                                return;
                            __VLS_ctx.deleteVenue(venue.id);
                        } }, ...{ class: ("px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700") }, });
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.openCreateForm) }, ...{ class: ("mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700") }, });
        if (__VLS_ctx.showForm) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 bg-white shadow rounded-lg p-6") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-semibold text-gray-800") }, });
            (__VLS_ctx.formData.id ? 'Edit Venue' : 'Add New Venue');
            __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.saveVenue) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("name"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("name"), value: ((__VLS_ctx.formData.name)), type: ("text"), required: (true), ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("location"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("location"), value: ((__VLS_ctx.formData.location)), type: ("text"), required: (true), ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("capacity"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("capacity"), type: ("number"), required: (true), ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md") }, });
            (__VLS_ctx.formData.capacity);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 flex justify-end") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.closeForm) }, type: ("button"), ...{ class: ("px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 mr-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700") }, });
        }
    }
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['animate-spin'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['sm:grid-cols-2'];
    __VLS_styleScopedClasses['lg:grid-cols-3'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-yellow-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['hover:bg-yellow-600'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-red-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['hover:bg-red-700'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['hover:bg-gray-700'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-green-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['hover:bg-green-700'];
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
            ArrowPathIcon: ArrowPathIcon,
            ExclamationCircleIcon: ExclamationCircleIcon,
            venues: venues,
            loading: loading,
            error: error,
            showForm: showForm,
            formData: formData,
            openCreateForm: openCreateForm,
            editVenue: editVenue,
            saveVenue: saveVenue,
            deleteVenue: deleteVenue,
            closeForm: closeForm,
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
