// src/utils/cloudinary.ts

/**
 * Cloudinary configuration for different upload contexts.
 */
export const cloudinaryConfig = {
  venueImages: {
    folder: "venue_images",
    preset: import.meta.env.VITE_CLOUDINARY_VENUE_IMAGES_PRESET,
  },
  floorPlans: {
    folder: "floor_plan_images",
    preset: import.meta.env.VITE_CLOUDINARY_FLOOR_PLAN_PRESET,
  },
};

/**
 * Validates the presence of essential environment variables.
 *
 * @throws {Error} If any required environment variable is missing.
 */
const validateCloudinaryEnv = (): void => {
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary cloud name is not defined in environment variables.");
  }
};

/**
 * Uploads a file to Cloudinary and returns the public_id of the uploaded file.
 *
 * @param {File} file - The file to be uploaded.
 * @param {string} folder - The folder in Cloudinary where the file will be stored.
 * @param {string} uploadPreset - The Cloudinary upload preset to use.
 * @returns {Promise<string>} - A promise that resolves to the public_id of the uploaded file.
 * @throws {Error} - If the upload fails or Cloudinary returns an error.
 */
export const uploadToCloudinary = async (
  file: File,
  folder: string,
  uploadPreset: string
): Promise<string> => {
  // Ensure required environment variables are present
  validateCloudinaryEnv();

  // Validate file
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  // Prepare form data for the request
  const formData = new FormData();
  formData.append("file", file); // Add the file to upload
  formData.append("upload_preset", uploadPreset); // Set the upload preset
  formData.append("folder", folder); // Specify the target folder in Cloudinary

  try {
    // Perform the upload request
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Handle successful upload
    if (data.public_id) {
      return data.public_id; // Return the public_id instead of the secure_url
    }

    // Handle Cloudinary-specific errors
    throw new Error(data.error?.message || "Failed to upload to Cloudinary");
  } catch (error) {
    // Log and rethrow the error for further handling
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary. Please try again.");
  }
};


/**
 * Uploads multiple files to Cloudinary and returns an array of secure URLs.
 *
 * @param {File[]} files - The files to be uploaded.
 * @param {Object} config - Configuration object containing folder and upload preset.
 * @param {string} config.folder - The Cloudinary folder to store files in.
 * @param {string} config.preset - The Cloudinary upload preset to use.
 * @returns {Promise<string[]>} - A promise that resolves to an array of secure URLs.
 * @throws {Error} - If any upload fails or Cloudinary returns an error.
 */
export const uploadFiles = async (
  files: File[],
  config: { folder: string; preset: string }
): Promise<string[]> => {
  // Validate input
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("No files provided for upload.");
  }

  try {
    // Use Promise.all for concurrent uploads
    const urls = await Promise.all(
      files.map((file) => uploadToCloudinary(file, config.folder, config.preset))
    );
    return urls;
  } catch (error) {
    // Log and rethrow the error for further handling
    console.error("Error uploading files:", error);
    throw new Error("Failed to upload files to Cloudinary.");
  }
};



// /**
//  * Constructs Cloudinary URLs for given public IDs.
//  * 
//  * @param publicIds - Array of Cloudinary public IDs.
//  * @returns Array of full Cloudinary URLs.
//  */
// export function constructCloudinaryUrls(publicIds: string[]): string[] {
//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
//   return publicIds.map((id) => `${baseUrl}${id}`);
// }
  /**
   * Constructs Cloudinary URLs with specific transformations.
   * 
   * @param publicIds - Array of Cloudinary public IDs.
   * @param options - Options for Cloudinary transformations (e.g., size).
   * @returns Array of full Cloudinary URLs with transformations.
   */
  export function constructCloudinaryUrls(publicIds: string[], options: { size: 'thumbnail' | 'original' }): string[] {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

    return publicIds.map((publicId) => {
      let transformation = '';

      // Apply thumbnail transformation (e.g., resize to 150x150)
      if (options.size === 'thumbnail') {
        transformation = 'w_150,h_150,c_fill,q_auto'; // Resize to 150x150, fill the space, and adjust quality
      }

      const url = `${baseUrl}/${transformation}/${publicId}.jpg`;
      console.log('Generated Cloudinary URL:', url); // Log the URL to check its correctness
      return url;
    });
  }


/**
 * Transforms venue data by converting public IDs in images and floor_plan_url 
 * fields to full Cloudinary URLs.
 * 
 * @param venues - Array of venue objects from the API response.
 * @returns Transformed array of venue objects with updated image URLs.
 */
export function transformVenueData(venues: any[]): any[] {
  return venues.map((venue) => ({
    ...venue,
    images: Array.isArray(venue.images) ? constructCloudinaryUrls(venue.images) : [],
    floor_plan_url: Array.isArray(venue.floor_plan_url) ? constructCloudinaryUrls(venue.floor_plan_url) : [],
  }));
}


/**
 * Constructs a Cloudinary URL for a given public ID.
 *
 * @param {string} publicId - The Cloudinary public ID of the image.
 * @returns {string} - The fully qualified Cloudinary URL.
 */
export const constructCloudinaryUrl = (publicId: string): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not defined in environment variables.");
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};


