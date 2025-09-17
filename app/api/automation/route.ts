import { NextRequest, NextResponse } from 'next/server';
import { newsAutomation, AutomationConfig } from '@/lib/automation';

export const dynamic = "force-dynamic";

// GET - Get automation status
export async function GET() {
  try {
    const status = newsAutomation.getStatus();
    
    return NextResponse.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error getting automation status:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get automation status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Start/stop automation or update config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, config } = body;

    switch (action) {
      case 'start':
        newsAutomation.start();
        return NextResponse.json({
          success: true,
          message: 'Automation started successfully'
        });

      case 'stop':
        newsAutomation.stop();
        return NextResponse.json({
          success: true,
          message: 'Automation stopped successfully'
        });

      case 'update-config':
        if (!config) {
          return NextResponse.json(
            { error: 'Configuration is required for update-config action' },
            { status: 400 }
          );
        }
        newsAutomation.updateConfig(config as Partial<AutomationConfig>);
        return NextResponse.json({
          success: true,
          message: 'Configuration updated successfully'
        });

      case 'run-once':
        // Run automation once without starting the interval
        const result = await (newsAutomation as any).runAutomationCycle();
        return NextResponse.json({
          success: true,
          result,
          message: 'Single automation cycle completed'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: start, stop, update-config, or run-once' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in automation API:', error);
    
    return NextResponse.json(
      { 
        error: 'Automation API error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update automation configuration
export async function PUT(request: NextRequest) {
  try {
    const config = await request.json();
    
    newsAutomation.updateConfig(config as Partial<AutomationConfig>);
    
    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      status: newsAutomation.getStatus()
    });
  } catch (error) {
    console.error('Error updating automation config:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}