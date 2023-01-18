import {
  createDashboardView,
  createNewWidgetModal,
  MapWidget,
  MapWidgetForm,
  ChartWidget,
  ChartWidgetForm,
  TableWidget,
  TableWidgetForm,
} from '@kuzzleio/dashboard-builder';

export const kdbWidgets = [
  {
    name: 'map',
    label: 'Map',
    component: MapWidget,
    formComponent: MapWidgetForm,
    icon: 'map',
  },
  {
    name: 'chart',
    label: 'Chart',
    component: ChartWidget,
    formComponent: ChartWidgetForm,
    icon: 'chart-bar',
  },
  {
    name: 'table',
    label: 'Table',
    component: TableWidget,
    formComponent: TableWidgetForm,
    icon: 'table',
  },
];

export const DashboardView = createDashboardView({ customWidgets: kdbWidgets });
export const NewWidgetModal = createNewWidgetModal({ customWidgets: kdbWidgets });
