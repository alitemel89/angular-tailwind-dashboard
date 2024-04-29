import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer'; // Import SimpleRenderer class
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'; // Import SimpleFillSymbol class
import Color from '@arcgis/core/Color'; // Import Color class
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!:
    | ElementRef
    | undefined;
  private map: any;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    if (!this.mapViewEl) {
      console.error('Map view element not found.');
      return;
    }

    const graphicsLayer = new GraphicsLayer();

    
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Sketch', 'esri/widgets/Popup', 'esri/layers/FeatureLayer'])
    .then(([Map, MapView, Sketch, Popup, FeatureLayer]) => {
      this.map = new Map({
        basemap: 'streets-vector'
      });

      const view = new MapView({
        container: this.mapViewEl!.nativeElement,
        map: this.map,
        center: [10.4515, 51.1657],

        zoom: 6,
      });

      const layer = new FeatureLayer({
        url: 'https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Germany%20Province%20Boundaries%202022%20update/FeatureServer',
        renderer: new SimpleRenderer({
          symbol: new SimpleFillSymbol({
            color: new Color([0, 50, 150, 0.2]), // Set color with opacity
            outline: {
              color: [120, 0, 25, 0.2], // Set outline color with opacity
              width: 1,
            },
          }),
        }),
      });

      // Create a popup template for the FeatureLayer
      const popupTemplate = {
        title: "{NAME}",
        content: "Population: {EW}",
      };

      // Apply the popup template to the FeatureLayer
      layer.popupTemplate = popupTemplate;

      view.when(() => {
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: view,
        });

        view.ui.add(sketch, 'top-right');

        // Add layer to map
        view.map.add(layer);

        // Create a Popup widget instance
        const popup = new Popup({
          view: view
        });

        // Add the Popup widget to the view
        view.ui.add(popup, 'top-right');



      });
    });

    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      if (isDarkMode) {
        this.map.basemap = 'streets-night-vector';
      } else {
        this.map.basemap = 'streets-vector';
      }
    });
  }
}
