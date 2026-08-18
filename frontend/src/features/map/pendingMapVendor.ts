let pendingVendorId: string | null = null;

export function queueVendorSelection(vendorId: string) {
    pendingVendorId = vendorId;
}

export function consumeQueuedVendorSelection() {
    const vendorId = pendingVendorId;
    pendingVendorId = null;
    return vendorId;
}
