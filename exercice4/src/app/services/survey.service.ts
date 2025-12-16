import { Injectable } from '@angular/core';
import { SurveyModel } from '../models/survey.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private surveys: SurveyModel[] = [
    {
      id: '1',
      name: 'Temperature Monitoring Survey',
      description: 'Daily temperature sensor data collection',
      assetId: 'sensor-001',
      interval: 1,
      status: 'active',
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-20T14:30:00Z')
    },
    {
      id: '2',
      name: 'Humidity Level Survey',
      description: 'Hourly humidity monitoring for greenhouse',
      assetId: 'sensor-002',
      interval: 1,
      status: 'active',
      createdAt: new Date('2024-02-01T09:15:00Z'),
      updatedAt: new Date('2024-02-05T16:45:00Z')
    },
    {
      id: '3',
      name: 'Vibration Analysis Survey',
      description: 'Machine vibration monitoring for predictive maintenance',
      assetId: 'sensor-003',
      interval: 5,
      status: 'completed',
      createdAt: new Date('2024-01-01T08:00:00Z'),
      updatedAt: new Date('2024-01-01T08:00:00Z')
    },
    {
      id: '4',
      name: 'Air Quality Monitoring',
      description: 'CO2 and particulate matter measurement',
      assetId: 'sensor-004',
      interval: 15,
      status: 'inactive',
      createdAt: new Date('2024-03-10T11:30:00Z'),
      updatedAt: new Date('2024-03-15T13:20:00Z')
    },
    {
      id: '5',
      name: 'Pressure Sensor Survey',
      description: 'Pipeline pressure monitoring system',
      assetId: 'sensor-005',
      interval: 2,
      status: 'active',
      createdAt: new Date('2024-02-20T15:45:00Z'),
      updatedAt: new Date('2024-02-25T10:15:00Z')
    },
    {
      id: '6',
      name: 'Motion Detection Survey',
      description: 'Security motion sensor data collection',
      assetId: 'sensor-006',
      interval: 1,
      status: 'completed',
      createdAt: new Date('2024-01-25T12:00:00Z'),
      updatedAt: new Date('2024-02-01T09:30:00Z')
    },
    {
      id: '7',
      name: 'Light Intensity Survey',
      description: 'Smart lighting system optimization',
      assetId: 'sensor-007',
      interval: 10,
      status: 'active',
      createdAt: new Date('2024-03-01T14:20:00Z'),
      updatedAt: new Date('2024-03-05T11:10:00Z')
    },
    {
      id: '8',
      name: 'Water Level Monitoring',
      description: 'Tank water level sensor readings',
      assetId: 'sensor-008',
      interval: 30,
      status: 'inactive',
      createdAt: new Date('2024-01-10T16:30:00Z'),
      updatedAt: new Date('2024-01-12T08:45:00Z')
    },
    {
      id: '9',
      name: 'Energy Consumption Survey',
      description: 'Smart meter energy usage tracking',
      assetId: 'sensor-009',
      interval: 60,
      status: 'active',
      createdAt: new Date('2024-02-15T13:15:00Z'),
      updatedAt: new Date('2024-02-18T17:00:00Z')
    },
    {
      id: '10',
      name: 'GPS Location Survey',
      description: 'Vehicle fleet tracking system',
      assetId: 'sensor-010',
      interval: 5,
      status: 'completed',
      createdAt: new Date('2024-03-05T10:45:00Z'),
      updatedAt: new Date('2024-03-08T14:25:00Z')
    },
    {
      id: '11',
      name: 'Soil Moisture Survey',
      description: 'Agricultural soil moisture monitoring',
      assetId: 'sensor-011',
      interval: 120,
      status: 'active',
      createdAt: new Date('2024-01-30T09:20:00Z'),
      updatedAt: new Date('2024-02-02T15:40:00Z')
    },
    {
      id: '12',
      name: 'Sound Level Monitoring',
      description: 'Noise pollution measurement in urban areas',
      assetId: 'sensor-012',
      interval: 15,
      status: 'inactive',
      createdAt: new Date('2024-02-10T11:55:00Z'),
      updatedAt: new Date('2024-02-12T16:30:00Z')
    }
  ];

  public getSurveys() {
    return this.surveys;
  }
  
}
