import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demonstration
const favorites = new Set<number>();

export async function GET() {
  return NextResponse.json({ favorites: Array.from(favorites) });
}

export async function POST(request: NextRequest) {
  try {
    const { productId, isFavorite } = await request.json();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (isFavorite) {
      favorites.add(productId);
    } else {
      favorites.delete(productId);
    }

    return NextResponse.json({
      success: true,
      favorites: Array.from(favorites),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update favorites" },
      { status: 500 }
    );
  }
}
