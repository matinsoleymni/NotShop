# Components

The `components/` directory contains reusable React components used throughout the application.

- `AppBottomNavigation.tsx`: A reusable component for the application's bottom navigation bar. It includes links to the Store and Profile pages and can optionally display cart content. This component is used in `app/pages/home.tsx` and `app/pages/profile.tsx`.
- `BottomNavigation.tsx`: Component for the bottom navigation bar. This component is now used internally by `AppBottomNavigation.tsx`.
- `CartModal.tsx`: Component for the shopping cart modal.
- `GeneralHeader.tsx`: Component for a general header.
- `HomeHeader.tsx`: Component for the header on the home page.
- `PaymentSuccess.tsx`: Component to display a payment success message.
- `SearchInput.tsx`: Component for a search input field.
- `Share.tsx`: Component for sharing functionality.
- `ShopCart.tsx`: Component displaying the shopping cart content.
- `NotLogoPlaceholder.tsx`: A placeholder component displaying the NotLogo with customizable width and height.

## ui/

The `ui/` subdirectory contains basic UI components.

- `Button.tsx`: Reusable button component.
- `Modal.tsx`: Reusable modal component.
