import React from 'react';
import { UploadCloudIcon } from './icons.jsx';

function EquipmentUpload({ onCancel }) {
  return (
    <div className="p-6">
      <div className="text-center">
        <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-white">
          Upload your file
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Upload the filled-out Excel template to create multiple equipment
          entries at once.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-slate-600 dark:text-slate-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:ring-offset-slate-800"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              XLSX, CSV up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end gap-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-400"
          disabled // Disabled until a file is selected
        >
          Upload and Create
        </button>
      </div>
    </div>
  );
}

export default EquipmentUpload;
