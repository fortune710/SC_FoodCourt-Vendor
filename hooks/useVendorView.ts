import { useContext } from "react";
import { VendorViewContext } from "~/providers/vendor-view";

export function useVendorView() {
    const context = useContext(VendorViewContext);
    if (context === undefined) {
      throw new Error('useVendorView must be used within a VendorViewProvider');
    }
    return context;
  }