const FormDataConverter = (data) => {
    const formData = new FormData();

    for (const key in data) {
        // Handle file fields
        if (['logo', 'permit_photo', 'owner_photo', 'insurance_photo'].includes(key)) {
            formData.append(key, data[key][0]); // Assuming `data[key]` is a FileList
        }
        // Handle object fields that need to be stringified
        else if (['owner_city', 'city'].includes(key)) {
            formData.append(key, JSON.stringify(data[key]));
        }
        // Handle other fields
        else {
            formData.append(key, data[key]);
        }
    }

    return formData;
};

export {
    FormDataConverter
}
