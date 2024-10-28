import { TrukErrorDialog, TrukLoaderMoveForword, TrukProcessDialog } from "../components/loaders/truck_move_forword";

const handleRequest = async (requestFunc, { loadingMessage, successMessage, errorMessage }) => {
    try {
        // setLoading(true);
        TrukLoaderMoveForword(loadingMessage || "Processing...");

        const response = await requestFunc(); // Execute the passed request function
        console.log("response", response);
        console.log("response?.error?.data?.success", response?.error?.data?.success)

        // Check if there is an error in the response or if the operation was unsuccessful
        if (response?.error || !(response?.data?.success)) {
            const errorMessageToShow = response?.error?.data?.message || errorMessage || "An error occurred, please try again later.";
            throw new Error(errorMessageToShow);
        }

        // Show success message if the request was successful
        TrukProcessDialog("Process Complete", successMessage || "Operation completed successfully.");
        return response;
    } catch (error) {
        console.log('error', error);

        // Handle known errors or show a generic message
        const errorMessageToShow = error?.message || error.response?.data?.message || errorMessage || "An error occurred, please try again later.";
        TrukErrorDialog("Error", `<p>${errorMessageToShow}</p>`);
        throw error; // Re-throw the error if needed for further handling
    } finally {
        // setLoading(false);
    }
};

export {
    handleRequest
}