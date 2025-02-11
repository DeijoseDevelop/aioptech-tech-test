export function parseChatResponse(response: string): string {
    const vehicles = extractVehicles(response);
    const highlightedMessage = extractHighlightedMessage(response);

    let formattedText = "";

    if (vehicles && vehicles.length > 0) {
        formattedText += "Vehículos:\n";
        vehicles.forEach((vehicle, index) => {
            formattedText += `${index + 1}. ${vehicle}\n`;
        });
    }

    if (highlightedMessage) {
        if (formattedText) {
            formattedText += "\n";
        }
        formattedText += `${highlightedMessage}`;
    }

    if (!formattedText.trim()) {
        return response.trim() || "No se encontró información relevante.";
    }

    return formattedText;
}

function extractVehicles(response: string): string[] | undefined {
    const listItemRegex = /^\s*\*\s+(.*)/gm;
    const matches = response.matchAll(listItemRegex);
    const vehicles: string[] = [];

    for (const match of matches) {
        vehicles.push(match[1].trim());
    }

    return vehicles.length > 0 ? vehicles : undefined;
}

function extractHighlightedMessage(response: string): string | undefined {
    const highlightedRegex = /\*\*(.*?)\*\*/;
    const match = response.match(highlightedRegex);
    return match ? match[1].trim() : undefined;
}
