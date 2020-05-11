export function checkExtension(file, extensions) {
    const extension = file.name.split('.').pop().toLowerCase();

    return extensions.includes(extension);
}
