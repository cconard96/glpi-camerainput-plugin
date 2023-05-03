type Point = {
    x: number;
    y: number;
};
/**
 * @see https://wicg.github.io/shape-detection-api/#detectedbarcode-section
 */
interface DetectedBarcode {
    boundingBox: DOMRectReadOnly;
    cornerPoints: Array<Point>;
    format: string;
    rawValue: string;
    // @undecaf/zbar-wasm extensions
    orientation: Orientation;
    quality: number;
}
declare enum Orientation {
    UNKNOWN = -1,
    UPRIGHT = 0,
    ROTATED_RIGHT = 1,
    UPSIDE_DOWN = 2,
    ROTATED_LEFT = 3
}
/**
 * Additional {@link BarcodeDetectorPolyfill} options supported by
 * the underlying ZBar implementation.
 */
declare class ZBarConfig {
    // Overrides automatic cache management if specified
    enableCache?: boolean;
    /**
     * Any of https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings;
     * defaults to UTF-8
     */
    encoding?: string;
}
/**
 * A polyfill for {@link external:BarcodeDetector}.
 *
 * @see https://wicg.github.io/shape-detection-api/#barcode-detection-api
 */
declare class BarcodeDetectorPolyfill {
    private readonly formats;
    private readonly zbarConfig;
    private canvas?;
    private scanner?;
    /**
     * See <a href="https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector/BarcodeDetector">
     *     BarcodeDetector()</a>
     */
    constructor(options?: {
        formats?: Array<string>;
        zbar?: ZBarConfig;
    });
    /**
     * See <a href="https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector/getSupportedFormats">
     *     BarcodeDetector.getSupportedFormats()</a>
     */
    static getSupportedFormats(): Promise<Array<string>>;
    /**
     * Scans an image for barcodes and returns a {@link Promise} for the result.
     *
     * @param {ImageBitmapSource} source the image to be scanned
     * @returns {Promise<Array<DetectedBarcode>>} the scan result as described for {@link BarcodeDetector},
     *  or a rejected {@link Promise} containing the error
     * @throws {TypeError} if the argument is not an {@link ImageBitmapSource}
     */
    // TODO Enable cache for video source, disable for others unless overridden in zbarConfig
    detect(source: ImageBitmapSource): Promise<Array<DetectedBarcode>>;
    /**
     * Returns an {@link ZBarScanner} configured for the requested barcode formats.
     */
    private getScanner;
    /**
     * Converts any {@link external:ImageBitmapSource} to an {@link ImageData} instance.
     */
    private toImageData;
    /**
     * Converts a ZBar {@link ZBarSymbol} to a {@link DetectedBarcode}.
     */
    private toBarcodeDetectorResult;
    /**
     * Type guard for {@link external:ImageBitmapSource} and any
     * object having zero width or height.
     */
    private static isImageBitmapSource;
    /**
     * Returns the intrinsic (as opposed to the rendered)
     * dimensions of an {@link external:ImageBitmapSource}.
     */
    private static intrinsicDimensions;
}
declare const ZBAR_WASM_PKG_NAME = "__ZBAR_WASM_PKG_NAME__";
declare const ZBAR_WASM_VERSION = "__ZBAR_WASM_VERSION__";
declare const ZBAR_WASM_REPOSITORY = "__ZBAR_WASM_REPOSITORY__";
export { BarcodeDetectorPolyfill, DetectedBarcode, Orientation, ZBarConfig, ZBAR_WASM_PKG_NAME, ZBAR_WASM_VERSION, ZBAR_WASM_REPOSITORY };
